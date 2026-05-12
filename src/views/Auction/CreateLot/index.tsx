"use client";

import { useState, useMemo } from "react";
import { Link } from "@/src/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PageHeader } from "@/src/components/ui/PageHeader";
import { Input } from "@/src/components/ui/Input";
import { Select } from "@/src/components/ui/Select";
import { Button } from "@/src/components/ui/Button";

import { ICreateLotFormData, INITIAL_FORM } from "./types";
import { CONDITION_OPTIONS, DELIVERY_OPTIONS, SEX_OPTIONS, SIZE_OPTIONS } from "./createLotConfig";

import { Section } from "./components/Section";
import { ImageUpload } from "./components/ImageUpload";
import { PreviewCard } from "./components/PreviewCard";
import { EyeIcon } from "@/public/assets/icons";

import { createLotSchema } from "@/src/schemas/createLot.schema";
import { LotPublished } from "./components/LotPublished";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { useCreateLot } from "@/src/hooks/useLots";
import { useWayForPay } from "@/src/hooks/useWayForPay";
import { useGetCategories } from "@/src/hooks/useCategory";
import { formatCurrency } from "@/src/utils/textUtils";
import { useToast } from "@/src/components/ui/Toast";

export const CreateLotView = () => {
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
        showToast("error", "Payment was not successful. Please try again.");
        return;
      }

      showToast("success", "Payment successful! Creating lot...");

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
      const message = error instanceof Error ? error.message : "Failed to create lot";
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
        label="New Listing"
        title="Create Lot"
        description="Fill in the details below to list your item for auction. All fields marked with * are required."
      />

      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Section step={1} title="Basic Information" description="Describe your item clearly to attract bidders">
            <div className="space-y-4">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    label="Lot Title"
                    required
                    placeholder="e.g. Vintage Rolex Submariner 1969"
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
                    label="Description"
                    required
                    rows={5}
                    placeholder="Describe provenance, condition details, notable features, included accessories…"
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
                      label="Category"
                      required
                      options={categoryOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={isLoadingCategories ? "Loading categories..." : "Select category"}
                      error={errors.categoryId?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="condition"
                  render={({ field }) => (
                    <Select
                      label="Condition"
                      required
                      options={CONDITION_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select condition"
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
                      label="Sex"
                      options={SEX_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Optional"
                      error={errors.sex?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="size"
                  render={({ field }) => (
                    <Select
                      label="Size"
                      options={SIZE_OPTIONS}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Optional"
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
                    label="Delivery Method"
                    required
                    options={DELIVERY_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select delivery method"
                    error={errors.delivery?.message}
                  />
                )}
              />
            </div>
          </Section>

          <Section step={2} title="Pricing" description="Set your starting price, bid increment and optional buy-now">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Controller
                control={control}
                name="startingPrice"
                render={({ field }) => (
                  <Input
                    type="currency"
                    label="Starting Price (₴)"
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
                    label="Min. Bid Increment (₴)"
                    placeholder="10.00"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.minBidIncrement?.message}
                  />
                )}
              />
            </div>
          </Section>

          <Section step={3} title="Auction Schedule" description="Define when your auction starts">
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <div className="max-w-sm">
                  <Input
                    type="date"
                    label="Start Date & Time"
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

          <Section step={4} title="Photos" description="Upload up to 8 high-quality images. First image will be the cover.">
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
                    By publishing this lot, you confirm that you have read and agree to our{" "}
                    <Link href="/privacy-policy" className="text-brand-primary hover:underline font-medium">
                      Privacy Policy
                    </Link>
                    {" "}and auction terms of service.
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
                Reset
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
                loadingText={isPaying ? "Processing Payment…" : "Publishing…"}
                disabled={!agreed}
              >
                {formValues.categoryId ? (
                  <>Publish Lot ({formatCurrency(categories.find(cat => cat.id === Number(formValues.categoryId))?.postingPrice || 0)})</>
                ) : (
                  <>Publish Lot</>
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
        <span className="font-semibold text-sm tracking-wide">Live Preview</span>
      </button>

      {previewOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#0b0c0f]/80 backdrop-blur-sm animate-bvCatFadeUp">
          <div className="relative w-full max-w-[340px]">
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-10 right-0 text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 text-sm font-mono tracking-wider uppercase cursor-pointer"
            >
              Close ✕
            </button>
            <PreviewCard form={formValues} categories={categories} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateLotView;
