import { Link } from "@/src/i18n/navigation";

type LogoProps = {
  collapsed: boolean;
  href?: string;
  variant?: "app" | "admin";
};

export const Logo = ({ collapsed, href = "/", variant = "app" }: LogoProps) => {
  const borderClass = variant === "admin" ? "border-admin-accent/15" : "border-border-primary";
  const markClass =
    variant === "admin"
      ? "bg-linear-to-br from-admin-primary to-admin-tertiary text-[#061018] shadow-[0_4px_12px_rgba(34,211,238,0.25)]"
      : "bg-linear-to-br from-[#f0a500] to-[#e07800] text-[#0b0c0f] shadow-[0_4px_12px_rgba(240,165,0,0.3)]";
  const wordAccentClass = variant === "admin" ? "text-admin-primary" : "text-brand-primary";

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-5 border-b w-full ${borderClass}`}
    >
      <div className={`w-[34px] h-[34px] flex items-center justify-center rounded-[10px] font-black text-[15px] shrink-0 ${markClass}`}>
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
        Bid<span className={wordAccentClass}>Vault</span>
      </span>
    </Link>
  );
};