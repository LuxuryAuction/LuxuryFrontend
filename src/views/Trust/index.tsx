"use client";

import { useState } from "react";
import { FAQ_DATA, RULES_DATA, SAFETY_TIPS } from "./trust.config";

export const TrustView = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12 md:py-24 max-w-6xl mx-auto">
      <div className="fixed inset-0 bg-[#08090c] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.06),transparent)] -z-10" />
      <div
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <header className="mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-400/80">
            Trust & Safety
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
          BidVault Protocol
        </h1>
        <p className="mt-4 text-sm text-white/30 max-w-md mx-auto leading-relaxed">
          Наші стандарти безпеки, правила платформи та відповіді на найчастіші запитання.
        </p>
      </header>

      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
            01. Кодекс Честі
          </h2>
          <div className="h-[1px] flex-1 bg-white/[0.05]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RULES_DATA.map((rule, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl border border-white/[0.05] bg-[#0c0e14] hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-6 text-[40px] font-black text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors">
                0{idx + 1}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                {rule.icon === 'shield' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
                {rule.icon === 'eye' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
                {rule.icon === 'message' && (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{rule.title}</h3>
              <p className="text-sm text-white/30 leading-relaxed">{rule.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
            02. FAQ / База знань
          </h2>
          <div className="h-[1px] flex-1 bg-white/[0.05]" />
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${openFaq === idx
                ? 'border-blue-500/40 bg-blue-500/[0.03]'
                : 'border-white/[0.05] bg-[#0c0e14] hover:border-white/10'
                }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${openFaq === idx ? 'border-blue-500/20 text-blue-400' : 'border-white/10 text-white/20'
                    }`}>
                    {item.category}
                  </span>
                  <span className={`text-lg font-bold transition-colors ${openFaq === idx ? 'text-white' : 'text-white/60'}`}>
                    {item.question}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-400' : 'text-white/20'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-8 pb-8 text-white/40 leading-relaxed text-sm">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section>
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
            03. Поради з безпеки
          </h2>
          <div className="h-[1px] flex-1 bg-white/[0.05]" />
        </div>

        <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#0c0e14] to-[#08090c] border border-blue-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-0" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Як захистити себе?</h3>
              {SAFETY_TIPS.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <p className="text-sm text-white/40 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center items-center text-center p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-bold mb-2">Залишилися питання?</h4>
              <p className="text-sm text-white/30 mb-8 max-w-[240px]">Наша команда підтримки готова допомогти вам 24/7 у будь-якій ситуації.</p>
              <button className="px-8 py-3 rounded-2xl bg-blue-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-400 transition-colors">
                Зв'язатися з нами
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-24 pt-12 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05]">
            <span className="text-blue-500 font-black text-xs">BV</span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-white uppercase tracking-widest">Protocol v2.4</div>
            <div className="text-[9px] font-mono text-white/20">Last updated: May 2026</div>
          </div>
        </div>
        <div className="flex gap-8">
          {["Security", "Privacy", "Terms"].map(label => (
            <span key={label} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-widest">
              {label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};
