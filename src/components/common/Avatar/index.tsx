"use client";

import Image from "next/image";

type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  onClick?: () => void;
  className?: string;
  bgColor?: string;
  style?: React.CSSProperties;
}

const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  
  return parts
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const sizeStyles: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-[9px]",
  sm: "w-7 h-7 text-[10px]",
  md: "w-8 h-8 text-[11px]",
  lg: "w-10 h-10 text-sm",
};

export const Avatar = ({
  name,
  src,
  size = "md",
  onClick,
  className = "",
  bgColor,
  style,
}: AvatarProps) => {
  const displayInitials = getInitials(name);

  return (
    <button
      onClick={onClick}
      aria-label="User menu"
      style={{
        ...(bgColor ? { background: bgColor, border: "none" } : {}),
        ...style,
      }}
      className={`
        ${sizeStyles[size]}
        shrink-0 flex items-center justify-center rounded-full font-bold overflow-hidden relative
        ${!bgColor ? "bg-gradient-to-br from-[#f0a500] to-[#e87c00] border-[3px] border-[#353a4a] text-black" : "text-white"}
        ${className}
      `}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes="40px" className="object-cover" />
      ) : (
        displayInitials
      )}
    </button>
  );
};