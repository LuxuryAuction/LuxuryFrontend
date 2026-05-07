import { BadgeVariant } from "./types";

interface Props {
  count: number;
  variant?: BadgeVariant;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  danger: "bg-red-500/[0.15] text-red-400 ring-1 ring-red-500/25",
  warning: "bg-amber-500/[0.12] text-amber-400 ring-1 ring-amber-500/25",
  success: "bg-emerald-500/[0.12] text-emerald-400 ring-1 ring-emerald-500/25",
};

export function SidebarBadge({ count, variant, className = "" }: Props) {
  const variantStyle = variant ? styles[variant] : "bg-gray-500/10 text-gray-500 ring-1 ring-gray-500/20";

  return (
    <span
      className={
        "ml-auto min-w-[20px] px-1.5 py-1 rounded-full " +
        "font-mono text-[10px] font-medium tracking-wide text-center leading-none " +
        variantStyle + " " + className
      }
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
