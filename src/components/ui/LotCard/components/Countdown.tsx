"use client";

import { useState, useEffect } from "react";

import { useTranslations } from "next-intl";
import { ClockIcon } from "@/public/assets/icons";

export const Countdown = ({ endsAt }: { endsAt: string }) => {
  const t = useTranslations("LotCard");
  const [label, setLabel] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) {
        setLabel(t("ended"));
        return;
      }
      const s = Math.floor(diff / 1000);
      const d = Math.floor(s / 86400);
      const h = Math.floor((s % 86400) / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      if (d > 0) {
        setLabel(`${d}d ${h}h`);
      } else {
        setLabel(
          `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
        );
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-black/40 border border-border-primary backdrop-blur-sm">
      <ClockIcon className="w-[11px] h-[11px] text-brand-primary" />
      <span className="font-mono text-[10px] font-semibold text-content-primary">
        {label}
      </span>
    </div>
  );
};
