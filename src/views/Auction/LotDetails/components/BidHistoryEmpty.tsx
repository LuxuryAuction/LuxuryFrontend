"use client";

import { useTranslations } from "next-intl";

export const BidHistoryEmpty = () => {
  const t = useTranslations("BidHistory");

  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center rounded-xl border border-dashed border-border-primary/60">
      <p className="text-sm text-content-secondary">{t("emptyTitle")}</p>
      <p className="text-xs text-content-tertiary mt-1 max-w-[220px] leading-relaxed">
        {t("emptyDescription")}
      </p>
    </div>
  );
};
