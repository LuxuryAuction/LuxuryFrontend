"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/src/i18n/navigation";

function AuctionCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number; fadeDir: 1 | -1;
      gold: boolean;
    };

    const COUNT = 60;
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      fadeDir: Math.random() > 0.5 ? 1 : -1,
      gold: Math.random() < 0.25,
    }));

    const GRID = 80;

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.strokeStyle = "rgba(42,46,58,0.45)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width + GRID; x += GRID) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height + GRID; y += GRID) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 120) * 0.18;
            ctx.strokeStyle = particles[i].gold || particles[j].gold
              ? "#f0a500"
              : "#353a4a";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.fadeDir * 0.004;
        if (p.alpha >= 1) { p.alpha = 1; p.fadeDir = -1; }
        if (p.alpha <= 0) { p.alpha = 0; p.fadeDir = 1; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha * 0.8;
        ctx.fillStyle = p.gold ? "#f0a500" : "#4a5270";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = 180 + Math.sin(t) * 20;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse);
      grad.addColorStop(0, "rgba(240,165,0,0.06)");
      grad.addColorStop(0.5, "rgba(240,165,0,0.02)");
      grad.addColorStop(1, "rgba(240,165,0,0)");
      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

function GavelIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-14"
      aria-hidden="true"
    >
      {/* Handle */}
      <line
        x1="22" y1="42"
        x2="8" y2="56"
        stroke="#4a5270"
        strokeWidth="4"
        strokeLinecap="round"
        className="animate-[gavelHandle_2s_ease-in-out_infinite]"
        style={{ transformOrigin: "8px 56px" }}
      />
      {/* Head */}
      <rect
        x="20" y="16"
        width="28" height="14"
        rx="3"
        fill="#1c1f27"
        stroke="#f0a500"
        strokeWidth="1.5"
        transform="rotate(-45 34 23)"
      />
      <rect
        x="32" y="4"
        width="20" height="14"
        rx="3"
        fill="#252a3c"
        stroke="#f0a500"
        strokeWidth="1.5"
        transform="rotate(-45 42 11)"
      />
      {/* Gold accent dot */}
      <circle cx="38" cy="10" r="2" fill="#f0a500" transform="rotate(-45 42 11)" />
    </svg>
  );
}

// ─── Lot tag component ────────────────────────────────────────────────────────
function LotTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#2e3452]">
        {label}
      </span>
      <span className="font-mono text-[13px] font-medium text-[#4a5270]">
        {value}
      </span>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#080a0f] flex flex-col items-center justify-center px-6 overflow-hidden">

      <AuctionCanvas />

      <div
        className="relative z-10 w-full max-w-[440px] text-center"
        style={{ animation: "fadeUp 0.6s ease both" }}
      >

        <div
          className="flex items-center justify-center gap-4 mb-6"
          style={{ animation: "fadeUp 0.6s 0.05s ease both", opacity: 0 }}
        >
          <GavelIcon />
          <div
            className="h-10 w-px bg-[#2a2e3a]"
            aria-hidden="true"
          />
          <div className="flex flex-col items-start gap-1">
            <span className="badge-mono text-[9px] font-mono tracking-[0.2em] uppercase text-[#2e3452]">
              Lot Status
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full border text-[10px] font-mono tracking-wide uppercase"
              style={{
                background: "rgba(255,77,106,0.1)",
                borderColor: "rgba(255,77,106,0.2)",
                color: "#ff4d6a",
              }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full bg-[#ff4d6a]"
                style={{ animation: "blink 1.4s infinite" }}
              />
              Cancelled
            </span>
          </div>
        </div>

        <div
          className="relative"
          style={{ animation: "fadeUp 0.6s 0.1s ease both", opacity: 0 }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-mono text-[160px] font-black leading-none pointer-events-none select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(42,46,58,0.6)",
              letterSpacing: "-0.04em",
            }}
          >
            404
          </span>
          <span
            className="relative font-mono text-[100px] font-black leading-none tracking-[-0.04em]"
            style={{
              background: "linear-gradient(135deg, #f0a500 20%, #e07800 60%, #f5c842 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
        </div>

        <div
          className="flex items-center gap-4 my-5"
          style={{ animation: "fadeUp 0.6s 0.15s ease both", opacity: 0 }}
        >
          <div className="flex-1 h-px bg-[#2a2e3a]" />
          <div className="flex items-center gap-6 px-4 py-2 rounded-[8px] bg-[#13151a] border border-[#2a2e3a]">
            <LotTag label="Lot" value="#0404" />
            <div className="w-px h-6 bg-[#2a2e3a]" />
            <LotTag label="Bids" value="—" />
            <div className="w-px h-6 bg-[#2a2e3a]" />
            <LotTag label="Status" value="Not Found" />
          </div>
          <div className="flex-1 h-px bg-[#2a2e3a]" />
        </div>

        <div
          style={{ animation: "fadeUp 0.6s 0.2s ease both", opacity: 0 }}
        >
          <h1 className="text-[22px] font-bold text-[#e8eaf0] tracking-tight mb-2">
            Lot not found
          </h1>
          <p className="text-[14px] text-[#4a5270] leading-relaxed">
            It looks like you've come across a page that doesn't exist.
            <br />
            If you have any further questions, please feel free to ask.
          </p>
        </div>

        <div
          className="mt-7 flex items-center justify-center gap-3 flex-wrap"
          style={{ animation: "fadeUp 0.6s 0.28s ease both", opacity: 0 }}
        >
          <Link
            href="/user/categories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[13px] font-semibold text-[#0b0c0f] transition-all duration-150 hover:-translate-y-px"
            style={{
              background: "linear-gradient(135deg, #f0a500, #e07800)",
              boxShadow: "0 2px 12px rgba(240,165,0,0.3)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(240,165,0,0.45)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 2px 12px rgba(240,165,0,0.3)";
            }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go home
          </Link>

          <Link
            href="/user/categories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[13px] font-medium text-[#8892a8] transition-all duration-150"
            style={{
              background: "#13151a",
              border: "1px solid #2a2e3a",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#353a4a";
              (e.currentTarget as HTMLElement).style.color = "#e8eaf0";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#2a2e3a";
              (e.currentTarget as HTMLElement).style.color = "#8892a8";
            }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Browse auctions
          </Link>

          <a
            href="https://t.me/flusnuk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[13px] font-medium text-[#8892a8] transition-all duration-150"
            style={{
              background: "#13151a",
              border: "1px solid #2a2e3a",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#353a4a";
              (e.currentTarget as HTMLElement).style.color = "#e8eaf0";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#2a2e3a";
              (e.currentTarget as HTMLElement).style.color = "#8892a8";
            }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M9.04 15.47l-.39 4.09c.56 0 .8-.24 1.1-.53l2.63-2.52 5.46 3.99c1 .55 1.71.26 1.96-.93l3.55-16.63.01-.01c.3-1.4-.5-1.95-1.47-1.59L1.3 9.3c-1.36.53-1.34 1.29-.23 1.63l5.46 1.7L19.02 4.6c.59-.36 1.13-.16.68.2" />
            </svg>
            Telegram
          </a>
        </div>

        <p
          className="mt-8 font-mono text-[10px] tracking-[0.18em] uppercase text-[#2e3452]"
          style={{ animation: "fadeUp 0.6s 0.35s ease both", opacity: 0 }}
        >
          AuctiqueBids · Auction Platform · Est. 2024
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}