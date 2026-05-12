"use client";

import { useState } from "react";
import { FAQ_DATA, RULES_DATA, SAFETY_TIPS } from "./trust.config";
import Button from "@/src/components/ui/Button";

export const TrustView = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative max-w-6xl mx-auto px-5 py-8 md:px-7 md:py-10 pb-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] z-0 opacity-90"
        aria-hidden
      >
      </div>

      <header className="relative z-10 mb-14 md:mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/25 bg-brand-primary/10 mb-5">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-primary/60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-primary" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-primary/90">
            Trust &amp; Safety
          </span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-content-primary tracking-tight leading-[1.05]">
          BidVault Protocol
        </h1>
        <p className="mt-4 text-sm text-content-secondary max-w-md mx-auto leading-relaxed">
          Наші стандарти безпеки, правила платформи та відповіді на найчастіші запитання.
        </p>
      </header>

      <section className="relative z-10 mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="h-px w-6 bg-brand-primary/60 shrink-0" aria-hidden />
          <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight uppercase">
            01. Кодекс честі
          </h2>
          <div className="h-px flex-1 bg-border-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {RULES_DATA.map((rule, idx) => (
            <div
              key={idx}
              className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border-primary bg-surface-secondary/80 hover:border-brand-primary/35 hover:bg-surface-secondary transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]"
            >
              <div className="absolute top-0 right-0 p-5 md:p-6 text-[36px] md:text-[40px] font-black text-content-primary/4 group-hover:text-brand-primary/8 transition-colors select-none pointer-events-none">
                0{idx + 1}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-5 md:mb-6 group-hover:scale-105 transition-transform">
                {rule.icon === "shield" && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
                {rule.icon === "eye" && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
                {rule.icon === "message" && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-content-primary mb-2 md:mb-3 tracking-tight">
                {rule.title}
              </h3>
              <p className="text-sm text-content-secondary leading-relaxed">{rule.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="h-px w-6 bg-brand-primary/60 shrink-0" aria-hidden />
          <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight uppercase">
            02. FAQ / База знань
          </h2>
          <div className="h-px flex-1 bg-border-primary" />
        </div>

        <div className="space-y-3 md:space-y-4">
          {FAQ_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl md:rounded-3xl border transition-all duration-300 overflow-hidden ${openFaq === idx
                ? "border-brand-primary/35 bg-brand-primary/5 shadow-[0_0_0_1px_rgba(240,165,0,0.08)]"
                : "border-border-primary bg-surface-secondary/60 hover:border-border-secondary"
                }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  <span
                    className={`shrink-0 text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-wide ${openFaq === idx
                      ? "border-brand-primary/35 text-brand-primary bg-brand-primary/10"
                      : "border-border-primary text-content-tertiary bg-surface-tertiary/50"
                      }`}
                  >
                    {item.category}
                  </span>
                  <span
                    className={`text-base md:text-lg font-bold transition-colors min-w-0 ${openFaq === idx ? "text-content-primary" : "text-content-secondary"
                      }`}
                  >
                    {item.question}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-brand-primary" : "text-content-tertiary"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-5 pb-5 md:px-8 md:pb-8 text-content-secondary leading-relaxed text-sm border-t border-border-primary/40 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10">
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="h-px w-6 bg-brand-primary/60 shrink-0" aria-hidden />
          <h2 className="text-xl md:text-2xl font-black text-content-primary tracking-tight uppercase">
            03. Поради з безпеки
          </h2>
          <div className="h-px flex-1 bg-border-primary" />
        </div>

        <div className="p-6 md:p-10 rounded-2xl md:rounded-4xl bg-linear-to-br from-surface-secondary to-surface-primary border border-border-primary relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
          <div className="absolute top-0 right-0 w-56 h-56 md:w-64 md:h-64 bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-5 md:space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-content-primary">Як захистити себе?</h3>
              {SAFETY_TIPS.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 md:gap-4">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 shadow-[0_0_8px_rgba(240,165,0,0.45)]" />
                  <p className="text-sm text-content-secondary leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center items-center text-center p-6 md:p-8 rounded-2xl md:rounded-3xl bg-surface-tertiary/40 border border-brand-primary/15">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-primary/15 border border-brand-primary/25 flex items-center justify-center text-brand-primary mb-5 md:mb-6">
                <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-content-primary font-bold mb-2">Залишилися питання?</h4>
              <p className="text-sm text-content-secondary mb-6 md:mb-8 max-w-[260px]">
                Наша команда підтримки готова допомогти вам 24/7 у будь-якій ситуації.
              </p>
              <Button variant="primary" size="md" type="button">
                Зв&apos;язатися з нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mt-16 md:mt-24 pt-10 border-t border-border-primary flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-surface-secondary flex items-center justify-center border border-border-primary">
            <span className="text-brand-primary font-black text-xs">BV</span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-content-primary uppercase tracking-widest">Protocol v2.4</div>
            <div className="text-[9px] font-mono text-content-tertiary">Last updated: May 2026</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {["Security", "Privacy", "Terms"].map((label) => (
            <span
              key={label}
              className="text-[10px] font-bold text-content-tertiary hover:text-brand-primary transition-colors cursor-pointer uppercase tracking-widest"
            >
              {label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};
