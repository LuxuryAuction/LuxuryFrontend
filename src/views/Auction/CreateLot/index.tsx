"use client";

import { useState, useMemo } from "react";
import { Link } from "@/src/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { PageHeader } from "@/src/components/ui/PageHeader";
import { Input } from "@/src/components/ui/Input";
import { Select } from "@/src/components/ui/Select";
import { Button } from "@/src/components/ui/Button";

import { ICreateLotFormData, INITIAL_FORM } from "./types";
import { CONDITION_OPTIONS, DELIVERY_OPTIONS, SEX_OPTIONS, SIZE_OPTIONS } from "./createLotConfig";

import { Section } from "./components/Section";
import { ImageUpload } from "./components/ImageUpload";
import { PreviewCard } from "./components/PreviewCard";
import { EyeIcon, EmptyBoxIcon } from "@/public/assets/icons";

import { createLotSchema } from "@/src/schemas/createLot.schema";
import { LotPublished } from "./components/LotPublished";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { useCreateLot } from "@/src/hooks/useLots";
import { useWayForPay } from "@/src/hooks/useWayForPay";
import { useGetCategories } from "@/src/hooks/useCategory";
import { formatCurrency } from "@/src/utils/textUtils";
import { useToast } from "@/src/components/ui/Toast";

export const CreateLotView = () => {
  const t = useTranslations("CreateLot");
  const [submitted, setSubmitted] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { createLot, isLoading: isCreating } = useCreateLot();
  const { pay, isLoading: isPaying } = useWayForPay();
  const { categories, isLoading: isLoadingCategories } = useGetCategories();
  const { showToast } = useToast();

  const categoryOptions = useMemo(() =>
    categories.map(cat => ({
      value: String(cat.id),
      label: `${cat.name} (${formatCurrency(cat.postingPrice)})`
    })),
    [categories]
  );

  const deliveryOptions = useMemo(() =>
    DELIVERY_OPTIONS.map(opt => {
      return {
        value: opt.value,
        label: t(`deliveryOptions.${opt.value}`) as string,
      };
    }),
    [t]
  );

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ICreateLotFormData>({
    resolver: zodResolver(createLotSchema),
    defaultValues: INITIAL_FORM,
  });

  const onSubmit = async (data: ICreateLotFormData) => {
    try {
      const selectedCategory = categories.find(cat => cat.id === Number(data.categoryId));
      const postingPrice = selectedCategory?.postingPrice || 50;
      const paymentResult = await pay({
        amount: postingPrice,
        productName: `Listing fee: ${data.title}`,
        clientFirstName: "User", // TODO: Get from profile
      });

      console.log("WayForPay Result:", paymentResult);

      if (paymentResult.status !== "approved") {
        showToast("error", t("toasts.paymentFailed"));
        return;
      }

      showToast("success", t("toasts.paymentSuccess"));

      await createLot({
        name: data.title,
        description: data.description,
        categoryId: Number(data.categoryId),
        startingPrice: Number(data.startingPrice),
        priceStep: Number(data.minBidIncrement) || 10,
        startDate: new Date(data.startDate).toISOString(),
        draft: false,
        sex: data.sex || "Unisex",
        condition: data.condition,
        size: data.size || "Universal",
        imageUrls: ["https://picsum.photos/800/800"], // mock for now
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to create lot:", error);
      const message = error instanceof Error ? error.message : t("toasts.createFailed");
      showToast("error", message);
    }
  };

  const formValues = watch();

  if (submitted) {
    return (
      <LotPublished title={formValues.title} reset={reset} setSubmitted={setSubmitted} />
    );
  }

  return (
    <div className="p-5 md:p-7 max-w-4xl mx-auto relative">
      <PageHeader
        label={t("pageHeader.label")}
        title={t("pageHeader.title")}
        description={t("pageHeader.description")}
      />

      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Section step={1} title={t("section1.title")} description={t("section1.description")}>
            <div className="space-y-4">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    label={t("section1.lotTitle")}
                    required
                    placeholder={t("section1.lotTitlePlaceholder")}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.title?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Input
                    type="textarea"
                    label={t("section1.descriptionLabel")}
                    required
                    rows={5}
                    placeholder={t("section1.descriptionPlaceholder")}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.description?.message}
                  />
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select
                      label={t("section1.category")}
                      required
                      options={categoryOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={isLoadingCategories ? t("section1.loadingCategories") : t("section1.categoryPlaceholder")}
                      error={errors.categoryId?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="condition"
                  render={({ field }) => (
                    <Select
                      label={t("section1.condition")}
                      required
                      options={CONDITION_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("section1.conditionPlaceholder")}
                      error={errors.condition?.message}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  control={control}
                  name="sex"
                  render={({ field }) => (
                    <Select
                      label={t("section1.sex")}
                      options={SEX_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("section1.optional")}
                      error={errors.sex?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="size"
                  render={({ field }) => (
                    <Select
                      label={t("section1.size")}
                      options={SIZE_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("section1.optional")}
                      error={errors.size?.message}
                    />
                  )}
                />
              </div>

              <Controller
                control={control}
                name="delivery"
                render={({ field }) => (
                  <Select
                    label={t("section1.deliveryMethod")}
                    required
                    options={deliveryOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={t("section1.deliveryMethodPlaceholder")}
                    error={errors.delivery?.message}
                  />
                )}
              />
            </div>
          </Section>

          <Section step={2} title={t("section2.title")} description={t("section2.description")}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Controller
                control={control}
                name="startingPrice"
                render={({ field }) => (
                  <Input
                    type="currency"
                    label={t("section2.startingPrice")}
                    required
                    placeholder="0.00"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.startingPrice?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="minBidIncrement"
                render={({ field }) => (
                  <Input
                    type="currency"
                    label={t("section2.minBidIncrement")}
                    placeholder="10.00"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.minBidIncrement?.message}
                  />
                )}
              />
            </div>
          </Section>

          <Section step={3} title={t("section3.title")} description={t("section3.description")}>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <div className="max-w-sm">
                  <Input
                    type="date"
                    label={t("section3.startDateTime")}
                    required
                    min="2025-05-01"
                    max="2099-12-31"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.startDate?.message}
                  />
                </div>
              )}
            />
          </Section>

          <Section step={4} title={t("section4.title")} description={t("section4.description")}>
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <>
                  <ImageUpload files={field.value} onChange={field.onChange} />
                  {errors.images && <p className="text-xs text-state-danger mt-1">{errors.images.message}</p>}
                </>
              )}
            />
          </Section>

          <div className="mt-2 pt-8 border-t border-border-primary flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12">
            <div className="max-w-sm">
              <Checkbox
                label={
                  <span className="text-xs text-content-tertiary leading-relaxed block">
                    {t.rich("agreements", {
                      privacyPolicy: (chunks) => (
                        <Link href="/privacy-policy" className="text-brand-primary hover:underline font-medium">
                          {chunks}
                        </Link>
                      )
                    })}
                  </span>
                }
                checked={agreed}
                onChange={setAgreed}
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button
                type="button"
                variant="admin-danger"
                size="sm"
                onClick={() => reset(INITIAL_FORM)}
                className="w-auto!"
              >
                {t("buttons.reset")}
              </Button>

              {/* <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onSaveDraft}
                isLoading={isCreating}
              >
                Save Draft
              </Button> */}
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isCreating || isPaying}
                loadingText={isPaying ? t("buttons.processingPayment") : t("buttons.publishing")}
                disabled={!agreed}
              >
                {formValues.categoryId ? (
                  <>{t("buttons.publishLotWithPrice", { price: formatCurrency(categories.find(cat => cat.id === Number(formValues.categoryId))?.postingPrice || 0) })}</>
                ) : (
                  <>{t("buttons.publishLot")}</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group flex items-center justify-center gap-3 bg-[#1c1f27]/80 backdrop-blur-md border border-[#2a2e3a] hover:border-[#F0A50040] hover:bg-[#1c1f27] text-content-primary px-5 py-3 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_-10px_rgba(240,165,0,0.25)] cursor-pointer"
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-20 group-hover:animate-ping" />
          <EyeIcon />
        </div>
        <span className="font-semibold text-sm tracking-wide">{t("buttons.livePreview")}</span>
      </button>

      {previewOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#0b0c0f]/80 backdrop-blur-sm animate-bvCatFadeUp">
          <div className="relative w-full max-w-[340px]">
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-10 right-0 text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-mono tracking-wider uppercase cursor-pointer"
            >
              {t("buttons.close")}
            </button>
            <PreviewCard form={formValues} categories={categories} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateLotView;
