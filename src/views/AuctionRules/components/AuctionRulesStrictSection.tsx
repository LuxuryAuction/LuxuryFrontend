"use client";

import { WarningIcon } from "@/public/assets/icons";
import { useState } from "react";

interface AuctionRulesStrictSectionProps {
  rules: string[];
}


const AuctionRulesStrictSection = ({ rules }: AuctionRulesStrictSectionProps) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="mb-12 md:mb-16 animate-bvCatFadeUp">

      {/* ── section header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-px w-6 bg-red-500/70" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-red-400/70">
              Обов&apos;язково до виконання
            </span>
          </div>
          <h2 className="text-[1.5rem] md:text-[2rem] font-black tracking-[-0.03em] uppercase leading-none text-content-primary">
            Обов&apos;язкові&nbsp;
            <span className="text-red-400">правила</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0 px-3.5 py-2 rounded-xl border border-red-500/30 bg-red-500/[0.08]">
          <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400/60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-300/90">Санкція — блокування</span>
        </div>
      </div>

      <div className="mb-6 flex gap-4 items-start rounded-2xl border border-red-500/20 bg-red-950/20 px-5 py-4">
        <div className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/15 text-red-400">
          <WarningIcon className="w-4 h-4" />
        </div>
        <p className="text-[12px] leading-relaxed text-red-200/45">
          Перед тим як зробити ставку або опублікувати лот — уважно прочитайте кожен пункт.
          Незнання правил не звільняє від відповідальності.
          Порушники отримують <span className="text-red-400/90 font-semibold">блокування без попередження</span>.
        </p>
      </div>

      <div className="relative">
        <div
          className="absolute left-[19px] top-6 bottom-6 w-px bg-linear-to-b from-red-500/60 via-red-500/20 to-transparent pointer-events-none"
          aria-hidden
        />

        <ul className="space-y-3 list-none m-0 p-0">
          {rules.map((rule, idx) => {
            const isActive = activeIdx === idx;
            const isLast = idx === rules.length - 1;

            return (
              <li
                key={idx}
                className="relative flex gap-4 group cursor-default"
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <div className="relative flex shrink-0 flex-col items-center" style={{ width: 38 }}>
                  <div
                    className={`
                      relative z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full
                      border font-mono text-[11px] font-bold tabular-nums tracking-tight
                      transition-all duration-300
                      ${isActive
                        ? "border-red-500/70 bg-red-500/20 text-red-300 shadow-[0_0_18px_rgba(239,68,68,0.35)]"
                        : "border-border-secondary bg-surface-secondary text-content-tertiary"
                      }
                    `}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  {!isLast && (
                    <div
                      className={`absolute top-[38px] bottom-0 left-1/2 -translate-x-1/2 w-px transition-colors duration-300 ${isActive ? "bg-red-500/40" : "bg-border-primary/50"}`}
                      style={{ height: "calc(100% + 12px)" }}
                      aria-hidden
                    />
                  )}
                </div>

                <div
                  className={`
                    flex-1 min-w-0 mb-px
                    rounded-2xl border px-4 py-3.5 md:px-5 md:py-4
                    transition-all duration-300
                    ${isActive
                      ? "border-red-500/30 bg-surface-tertiary shadow-[0_8px_32px_-12px_rgba(239,68,68,0.2),0_2px_8px_-4px_rgba(0,0,0,0.4)]"
                      : "border-border-primary bg-surface-secondary"
                    }
                  `}
                >
                  <p
                    className={`text-[13px] md:text-[14px] leading-relaxed transition-colors duration-300 ${isActive ? "text-content-primary" : "text-content-secondary"}`}
                  >
                    {rule}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}


export default AuctionRulesStrictSection;