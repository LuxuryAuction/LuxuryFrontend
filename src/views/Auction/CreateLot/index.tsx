"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Link } from "@/src/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import { PageHeader } from "@/src/components/ui/PageHeader";
import { Input } from "@/src/components/ui/Input";
import { Select } from "@/src/components/ui/Select";
import { Button } from "@/src/components/ui/Button";

import { ICreateLotFormData, INITIAL_FORM } from "./types";
import { SIZE_OPTIONS } from "./createLotConfig";
import { buildConditionOptions } from "@/src/constants/itemCondition";
import { buildSexOptions } from "@/src/constants/lotSex";
import { buildDeliveryOptions } from "@/src/constants/lotDelivery";

import { Section } from "./components/Section";
import { ImageUpload } from "./components/ImageUpload";

import { createLotSchema } from "@/src/schemas/createLot.schema";
import { LotPublished } from "./components/LotPublished";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { useCreateLot } from "@/src/hooks/useLots";
import { useBalanceTopUp } from "@/src/hooks/useBalanceTopUp";
import { useGetCategories } from "@/src/hooks/useCategory";
import { useGetProfile } from "@/src/hooks/useUserProfile";
import { formatCurrency } from "@/src/utils/textUtils";
import { useToast } from "@/src/components/ui/Toast";
import { RootState } from "@/src/store";
import { buildCreateLotRequest } from "@/src/utils/createLotPayload";
import {
  clearPendingLotDraft,
  loadPendingLotDraft,
  savePendingLotDraft,
  setPostTopUpRedirect,
} from "@/src/utils/paymentStorage";
import {
  computeTopUpShortfall,
  CREATE_LOT_TOP_UP_RETURN_PATH,
  isInsufficientBalanceError,
  isTopUpReturn,
} from "@/src/utils/paymentReturn";
import type { ApiError } from "@/src/services/apiService";

const RESUME_POLL_INTERVAL_MS = 2000;
const RESUME_POLL_MAX_ATTEMPTS = 15;

export const CreateLotView = () => {
  const t = useTranslations("CreateLot");
  const tCondition = useTranslations("ItemCondition");
  const tSex = useTranslations("ItemSex");
  const tDelivery = useTranslations("LotDelivery");
  const searchParams = useSearchParams();
  const authUserName = useSelector((state: RootState) => state.auth.userName);

  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isResuming, setIsResuming] = useState(false);
  const resumeStartedRef = useRef(false);

  const { createLot, isLoading: isCreating } = useCreateLot();
  const { startTopUp, isLoading: isStartingTopUp, minAmount, maxAmount } = useBalanceTopUp();
  const { categories, isLoading: isLoadingCategories } = useGetCategories();
  const { data: profile, refetch: refetchProfile } = useGetProfile(authUserName ?? undefined);
  const { showToast } = useToast();

  const categoryOptions = useMemo(() =>
    categories.map(cat => ({
      value: String(cat.id),
      label: `${cat.name} (${formatCurrency(cat.postingPrice)})`
    })),
    [categories]
  );

  const deliveryOptions = useMemo(
    () => buildDeliveryOptions((key) => tDelivery(key)),
    [tDelivery],
  );

  const conditionOptions = useMemo(
    () => buildConditionOptions((key) => tCondition(key)),
    [tCondition],
  );

  const sexOptions = useMemo(
    () => buildSexOptions((key) => tSex(key)),
    [tSex],
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

  const getPostingPrice = useCallback(
    (categoryId: string | number) => {
      const selectedCategory = categories.find((cat) => cat.id === Number(categoryId));
      return selectedCategory?.postingPrice ?? 50;
    },
    [categories],
  );

  const publishLot = useCallback(
    async (data: ICreateLotFormData) => {
      await createLot(buildCreateLotRequest(data));
      setSubmitted(true);
    },
    [createLot],
  );

  const redirectToTopUp = useCallback(
    async (data: ICreateLotFormData, postingPrice: number, balance: number) => {
      const topUpAmount = computeTopUpShortfall(balance, postingPrice, minAmount, maxAmount);
      await savePendingLotDraft(data, postingPrice);
      setPostTopUpRedirect(CREATE_LOT_TOP_UP_RETURN_PATH);
      showToast("info", t("toasts.redirectingToTopUp"));
      await startTopUp(topUpAmount);
    },
    [minAmount, maxAmount, showToast, startTopUp, t],
  );

  useEffect(() => {
    if (!isTopUpReturn(searchParams) || !authUserName || resumeStartedRef.current) {
      return;
    }
    resumeStartedRef.current = true;

    let cancelled = false;

    const resumeAfterTopUp = async () => {
      setIsResuming(true);
      const draft = await loadPendingLotDraft();
      if (!draft || cancelled) {
        setIsResuming(false);
        return;
      }

      reset(draft.form);

      for (let attempt = 0; attempt < RESUME_POLL_MAX_ATTEMPTS; attempt += 1) {
        if (cancelled) return;

        const updated = await refetchProfile();
        const balance = updated?.balance ?? 0;

        if (balance >= draft.postingPrice) {
          try {
            await publishLot(draft.form);
            clearPendingLotDraft();
            showToast("success", t("toasts.publishSuccess"));
          } catch (error) {
            if (isInsufficientBalanceError(error)) {
              showToast("error", t("toasts.insufficientBalance"));
            } else {
              const message =
                error instanceof Error ? error.message : t("toasts.createFailed");
              showToast("error", message);
            }
          } finally {
            setIsResuming(false);
          }
          return;
        }

        await new Promise((resolve) => {
          window.setTimeout(resolve, RESUME_POLL_INTERVAL_MS);
        });
      }

      showToast("info", t("toasts.paymentStillProcessing"));
      setIsResuming(false);
    };

    void resumeAfterTopUp();

    return () => {
      cancelled = true;
    };
  }, [authUserName, publishLot, refetchProfile, reset, searchParams, showToast, t]);

  const onSubmit = async (data: ICreateLotFormData) => {
    const postingPrice = getPostingPrice(data.categoryId);

    try {
      let balance = profile?.balance ?? 0;
      if (!profile && authUserName) {
        const refreshed = await refetchProfile();
        balance = refreshed?.balance ?? 0;
      }

      if (balance >= postingPrice) {
        await publishLot(data);
        showToast("success", t("toasts.publishSuccess"));
        return;
      }

      await redirectToTopUp(data, postingPrice, balance);
    } catch (error) {
      if (isInsufficientBalanceError(error)) {
        const balance = profile?.balance ?? 0;
        try {
          await redirectToTopUp(data, postingPrice, balance);
        } catch (topUpError) {
          const message =
            topUpError instanceof Error ? topUpError.message : t("toasts.createFailed");
          showToast("error", message);
        }
        return;
      }

      const apiError = error as ApiError;
      const message =
        error instanceof Error
          ? error.message
          : apiError.message || t("toasts.createFailed");
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
    <div className="p-5 md:p-7 max-w-4xl mx-auto">
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
                      options={conditionOptions}
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
                      options={sexOptions}
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
                isLoading={isCreating || isStartingTopUp || isResuming}
                loadingText={
                  isResuming
                    ? t("buttons.confirmingPayment")
                    : isStartingTopUp
                      ? t("buttons.processingPayment")
                      : t("buttons.publishing")
                }
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
    </div>
  );
}

export default CreateLotView;
