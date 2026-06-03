"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  AvatarWearableLayer,
  getAvatarWearable,
  type EquippedAvatarWearables,
} from "./wearables";

type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
  bgColor?: string;
  style?: CSSProperties;
  wearables?: EquippedAvatarWearables;
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
  className = "",
  bgColor,
  style,
  wearables,
}: AvatarProps) => {
  const displayInitials = getInitials(name);
  const clothes = wearables?.clothes ? getAvatarWearable(wearables.clothes) : null;
  const accessory = wearables?.accessory ? getAvatarWearable(wearables.accessory) : null;
  const headwear = wearables?.headwear ? getAvatarWearable(wearables.headwear) : null;
  const frame = wearables?.frame ? getAvatarWearable(wearables.frame) : null;

  return (
    <div
      style={{
        ...(bgColor ? { background: bgColor, border: "none" } : {}),
        ...style,
      }}
      className={`
        ${sizeStyles[size]}
        shrink-0 flex items-center justify-center rounded-full font-bold overflow-visible relative
        ${!bgColor ? "bg-linear-to-br from-[#f0a500] to-[#e87c00] border-[3px] border-[#353a4a] text-black" : "text-white"}
        ${className}
      `}
    >
      <span className="absolute inset-0 z-20 overflow-hidden rounded-full">
        {src ? (
          <Image src={src} alt={name} fill sizes="40px" className="object-cover" unoptimized />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">{displayInitials}</span>
        )}
      </span>
      <span className="absolute inset-0 z-30 overflow-hidden rounded-full" aria-hidden>
        {clothes && <AvatarWearableLayer id={clothes.id} />}
      </span>
      <span className="absolute inset-0 z-40 overflow-hidden rounded-full" aria-hidden>
        {accessory && <AvatarWearableLayer id={accessory.id} />}
      </span>
      <span
        className="absolute -top-[31%] left-1/2 z-70 h-[48%] w-[84%] -translate-x-1/2"
        aria-hidden
      >
        {headwear && <AvatarWearableLayer id={headwear.id} />}
      </span>
      <span className="absolute inset-0 z-60" aria-hidden>
        {frame && <AvatarWearableLayer id={frame.id} />}
      </span>
      <span className="sr-only">{name}</span>
    </div>
  );
};