"use client";

import { Avatar } from "@/src/components/common/Avatar";

const ADMIN_TEAM = [
  {
    role: "Head Administration",
    name: "Pronin",
    username: "auctionpronin",
    avatar: "/images/categories/pronin.png",
    note: "Primary Advertising & Strategic Partnerships. Serious inquiries only.",
    isPrimary: true,
    color: "#f0a500",
    id: "head",
  },
  {
    role: "System Admin",
    name: "RDK Vintage",
    username: "rdkvintage",
    avatar: "/images/categories/admin1.png",
    color: "#3b82f6",
    id: "admin",
  },
  {
    role: "Moderator",
    name: "Oleja",
    username: "oleja6_o",
    avatar: "/images/categories/admin2.png",
    color: "#22c55e",
    id: "mod1",
  },
  {
    role: "Moderator",
    name: "Dro4eni Ejik",
    username: "dro4eni_ejik",
    avatar: "/images/categories/admin3.png",
    color: "#a855f7",
    id: "mod2",
  },
];

const ROLE_STYLES: Record<string, { accent: string; glow: string; tag: string }> = {
  head: {
    accent: "border-amber-500/20 hover:border-amber-500/40",
    glow: "from-amber-500/10 via-transparent to-transparent",
    tag: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  admin: {
    accent: "border-blue-500/20 hover:border-blue-500/40",
    glow: "from-blue-500/10 via-transparent to-transparent",
    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  mod1: {
    accent: "border-emerald-500/20 hover:border-emerald-500/40",
    glow: "from-emerald-500/10 via-transparent to-transparent",
    tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  mod2: {
    accent: "border-purple-500/20 hover:border-purple-500/40",
    glow: "from-purple-500/10 via-transparent to-transparent",
    tag: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
};

const ROLE_LABELS: Record<string, string> = {
  "Head Administration": "Head Director",
  "System Admin": "Core Systems",
  Moderator: "Moderator",
};

export const InfoView = () => {
  const head = ADMIN_TEAM.find((a) => a.id === "head")!;
  const rest = ADMIN_TEAM.filter((a) => a.id !== "head");

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12 md:py-24 max-w-6xl mx-auto">
      {/* Background layers */}
      <div className="fixed inset-0 bg-[#08090c] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(240,165,0,0.06),transparent)] -z-10" />
      <div
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <header className="mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">
            Nexus Command
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
          Directorship
        </h1>
        <p className="mt-4 text-sm text-white/30 max-w-md mx-auto leading-relaxed">
          The governing body of BidVault. Strategic oversight and community
          management.
        </p>
      </header>

      {/* Head Admin — Hero Card */}
      <section className="mb-8">
        <div
          className={`group relative rounded-3xl border ${ROLE_STYLES.head.accent} bg-[#0c0e14] transition-all duration-700 overflow-hidden`}
        >
          {/* Ambient glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${ROLE_STYLES.head.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          />

          <div className="relative p-8 md:p-12">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-10">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] ${ROLE_STYLES.head.tag}`}
              >
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                Head Director
              </span>
              <span className="text-[10px] font-mono text-white/20 tracking-wider">
                LVL.MAX
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/10 p-[1px]">
                  <div className="w-full h-full rounded-2xl bg-[#0c0e14] flex items-center justify-center">
                    <Avatar
                      name={head.name}
                      src={head.avatar}
                      className="w-full h-full !rounded-2xl text-4xl font-black !bg-transparent !border-none"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-amber-500 border-2 border-[#0c0e14] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-1">
                  {head.name}
                </h2>
                <p className="text-sm font-mono text-amber-500/60 mb-6">
                  @{head.username}
                </p>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] max-w-lg">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">
                    Active Focus
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {head.note}
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={`https://t.me/${head.username}`}
                    target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-500 text-black text-xs font-black uppercase tracking-[0.15em] hover:bg-amber-400 transition-colors shadow-[0_0_40px_rgba(240,165,0,0.15)] hover:shadow-[0_0_60px_rgba(240,165,0,0.25)]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                    Direct Line
                  </a>
                  <div className="flex gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    <span>Full Access</span>
                    <span className="text-white/10">|</span>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the team */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rest.map((member) => {
          const style = ROLE_STYLES[member.id];
          return (
            <div
              key={member.id}
              className={`group relative rounded-3xl border ${style.accent} bg-[#0c0e14] transition-all duration-700 overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${style.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative p-8">
                <div className="flex items-center justify-between mb-8">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em] ${style.tag}`}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: member.color }}
                    />
                    {ROLE_LABELS[member.role] || member.role}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-xl p-[1px]"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}33, transparent)`,
                    }}
                  >
                    <div className="w-full h-full rounded-xl bg-[#0c0e14] flex items-center justify-center">
                      <Avatar
                        name={member.name}
                        src={member.avatar}
                        size="md"
                        className="!rounded-xl !border-none"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white tracking-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-white/25">
                      @{member.username}
                    </p>
                  </div>
                </div>

                <a
                  href={`https://t.me/${member.username}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                  Contact
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="p-10 md:p-14 rounded-3xl border border-white/[0.04] bg-[#0c0e14]">
          <div className="w-8 h-[1px] bg-amber-500/30 mx-auto mb-8" />
          <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
            Nexus Code of Conduct
          </h3>
          <p className="text-sm text-white/25 max-w-2xl mx-auto leading-relaxed mb-8">
            BidVault is governed by the principles of high-value exchange and
            absolute integrity. Our directors ensure that every transaction meets
            our rigorous standards. Contact the appropriate personnel for your
            specific needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Verified Nexus", "Global Ops", "v2.4.1"].map((label, i) => (
              <span
                key={label}
                className={`px-5 py-2 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em] ${i === 0
                  ? "border-amber-500/15 text-amber-500/40"
                  : i === 1
                    ? "border-blue-500/15 text-blue-500/40"
                    : "border-white/[0.06] text-white/15"
                  }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
