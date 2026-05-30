import { Link } from "@/src/i18n/navigation";
import { BrandLogo } from "@/src/components/common/BrandLogo";

type LogoProps = {
  collapsed: boolean;
  href?: string;
  variant?: "app" | "admin";
};

export const Logo = ({ collapsed, href = "/", variant = "app" }: LogoProps) => {
  const borderClass = variant === "admin" ? "border-admin-accent/15" : "border-border-primary";

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-5 border-b w-full ${borderClass}`}
    >
      <span
        className={
          "whitespace-nowrap overflow-hidden " +
          "transition-all duration-300 ease-in-out " +
          (collapsed
            ? "max-w-[34px] opacity-100"
            : "max-w-[190px] opacity-100")
        }
      >
        <BrandLogo showText={!collapsed} variant={variant} />
      </span>
    </Link>
  );
};