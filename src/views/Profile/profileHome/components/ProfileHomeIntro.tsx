"use client";

import { useTranslations } from "next-intl";

interface ProfileHomeIntroProps {
  isMe: boolean;
  profileName: string;
  unlocked: number;
  total: number;
}

export function ProfileHomeIntro({
  isMe,
  profileName,
  unlocked,
  total,
}: ProfileHomeIntroProps) {
  const t = useTranslations("ProfileHome");

  return (
    <div className="border-b border-border-primary px-5 py-5 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 shrink-0 bg-linear-to-r from-brand-primary to-transparent" aria-hidden />
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-brand-primary/90">
              {t("eyebrow")}
            </span>
          </div>

          <h1 className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-extrabold leading-tight tracking-tight text-content-primary">
            {isMe ? t("titleOwn") : t("titleOther", { name: profileName })}
          </h1>

          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-content-secondary">
            {isMe ? t("subtitleOwn") : t("subtitleOther")}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end sm:pt-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-content-tertiary sm:text-right">
            {t("introStatLabel")}
          </span>
          <span className="text-xl font-black tabular-nums text-content-primary sm:text-2xl">
            {unlocked}
            <span className="text-content-tertiary text-base font-semibold">/{total}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
