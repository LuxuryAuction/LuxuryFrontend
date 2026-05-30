"use client";

import { Avatar } from "@/src/components/common/Avatar";


const ShieldCheckSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const CpuChipSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
  </svg>
);
const ScaleSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
  </svg>
);
const EyeSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const ChatBubbleLeftRightSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.84 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
);
const BoltSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const ADMIN_TEAM = [
  {
    role: "Head Administration",
    name: "Pronin",
    username: "auctionpronin",
    avatar: "/images/categories/pronin.png",
    note: "Primary Advertising & Strategic Partnerships. Strategic oversight and top-level community management.",
    color: "#f0a500",
    id: "head",
    icon: ShieldCheckSVG
  },
  {
    role: "System Admin",
    name: "RDK Vintage",
    username: "rdkvintage",
    avatar: "/images/categories/admin1.png",
    color: "#3b82f6",
    id: "admin",
    note: "Infrastructure and core system stability.",
    icon: CpuChipSVG
  },
  {
    role: "Moderator",
    name: "Oleja",
    username: "oleja6_o",
    avatar: "/images/categories/admin2.png",
    color: "#22c55e",
    id: "mod1",
    note: "Dispute resolution and content moderation.",
    icon: ScaleSVG
  },
  {
    role: "Moderator",
    name: "Dro4eni Ejik",
    username: "dro4eni_ejik",
    avatar: "/images/categories/admin3.png",
    color: "#a855f7",
    id: "mod2",
    note: "Community engagement and rule enforcement.",
    icon: EyeSVG
  },
];

const ROLE_LABELS: Record<string, string> = {
  "Head Administration": "Head Director",
  "System Admin": "Core Systems",
  Moderator: "Moderator",
};

export const InfoView = () => {
  return (
    <div className="relative min-h-screen px-6 py-20 md:px-12 w-full  mx-auto flex flex-col font-sans">
      {/* Background layers */}
      <div className="fixed inset-0 bg-[#06070a] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(240,165,0,0.04),transparent)] -z-10" />
      <div
        className="fixed inset-0 -z-10 opacity-[0.01]"
        style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      {/* Header */}
      <header className="mb-14 w-full">
        <div className="inline-flex items-center gap-2 mb-6">
          <BoltSVG className="w-4 h-4 text-white/40" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
            Nexus Directory
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
          Directorship
        </h1>
        <p className="text-lg text-white/30 max-w-xl leading-relaxed font-light">
          The governing body of AuctiqueBids. Absolute authority, strategic oversight, and unyielding integrity.
        </p>
      </header>


      <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 mb-8 border-b border-white/5 pb-4">
        Core Operations & Enforcement
      </h3>

      <div className="flex flex-col">
        {ADMIN_TEAM.map((member) => (
          <div key={member.id} className="group flex flex-col md:flex-row items-start md:items-center py-10 border-b border-white/5 gap-8 md:gap-12 hover:bg-white/1 transition-colors -mx-6 px-6">

            <div className="flex items-center gap-8 md:w-1/3">
              <Avatar
                name={member.name}
                src={member.avatar}
                size="lg"
                className="rounded-full! border border-white/10 shrink-0"
              />
              <div>
                <h4 className="text-2xl font-bold text-white tracking-tight mb-1">{member.name}</h4>
                <p className="text-xs font-mono text-white/30">@{member.username}</p>
              </div>
            </div>

            <div className="flex-1 md:w-1/3">
              <div className="inline-flex items-center gap-2 mb-2">
                <member.icon className="w-4 h-4" style={{ color: member.color }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: member.color }}>
                  {ROLE_LABELS[member.role] || member.role}
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed font-light">
                {member.note}
              </p>
            </div>

            <div className="md:text-right shrink-0">
              <a
                href={`https://t.me/${member.username}`}
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white transition-colors"
              >
                Message
                <svg className="w-4 h-4 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>
        ))}
      </div>

      <footer className="mt-auto pt-16">
        <h3 className="text-3xl font-black text-white tracking-tighter mb-6">
          The Code
        </h3>
        <p className="text-base text-white/40 leading-relaxed max-w-2xl font-light mb-12">
          AuctiqueBids operates on principles of high-value exchange and absolute integrity.
          Our directors ensure that every transaction meets rigorous standards. Violations of community guidelines are met with immediate, non-negotiable action.
        </p>

        <div className="flex items-center gap-6 text-[9px] font-mono uppercase tracking-[0.2em] text-white/20">
          <span>Verified Nexus</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>Global Ops</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>v2.5.0</span>
        </div>
      </footer>
    </div>
  );
};
