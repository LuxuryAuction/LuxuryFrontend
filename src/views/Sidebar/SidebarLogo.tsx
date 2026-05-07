import Link from "next/link";

type LogoProps = {
  collapsed: boolean;
  href?: string;
};

export const Logo = ({ collapsed, href = "/" }: LogoProps) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-5 border-b border-border-primary w-full"
    >
      <div className="w-[34px] h-[34px] flex items-center justify-center rounded-[10px] bg-linear-to-br from-[#f0a500] to-[#e07800] text-[#0b0c0f] font-black text-[15px] shadow-[0_4px_12px_rgba(240,165,0,0.3)] shrink-0">
        B
      </div>

      <span
        className={
          "font-bold text-[15px] text-[#e8eaf0] tracking-tight whitespace-nowrap overflow-hidden " +
          "transition-all duration-300 ease-in-out " +
          (collapsed
            ? "max-w-0 opacity-0 ml-0"
            : "max-w-[120px] opacity-100 ml-0")
        }
      >
        Bid<span className="text-brand-primary">Vault</span>
      </span>
    </Link>
  );
};