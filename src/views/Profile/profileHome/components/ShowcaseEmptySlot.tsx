"use client";

import { useTranslations } from "next-intl";

interface ShowcaseEmptySlotProps {
  isMe: boolean;
}

export function ShowcaseEmptySlot({ isMe }: ShowcaseEmptySlotProps) {
  const t = useTranslations("ProfileHome");

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border-primary/80 bg-surface-secondary/30 min-h-[148px] px-3 py-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-border-primary/60 bg-surface-primary/50 mb-3">
        <span className="font-mono text-lg text-content-tertiary/40">—</span>
      </div>
      <p className="text-[11px] font-medium text-content-tertiary leading-snug">
        {isMe ? t("showcaseEmptySlotOwn") : t("showcaseEmptySlot")}
      </p>
    </div>
  );
}
