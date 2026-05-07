"use client";

import { ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from "@/public/assets/icons";
import { formatDateTime } from "@/src/utils/textUtils";
import Image from "next/image";
import { useState, useRef } from "react";

interface LotInfoProps {
  title: string;
  description: string;
  images: string[];
  attributes: { label: string; value: string }[];
  lotNumber: string;
  category: string;
  publishedAt?: string;
}

export const LotInfo = ({ title, description, images, attributes, lotNumber, category, publishedAt }: LotInfoProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isZoomed) return;
    dragStartX.current = e.clientX;
    didDrag.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 10) {
      didDrag.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;

    if (didDrag.current) {
      if (delta < -50) {
        setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (delta > 50) {
        setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      didDrag.current = false;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div
          className="relative aspect-4/3 rounded-[16px] overflow-hidden border border-border-primary bg-surface-secondary shadow-2xl cursor-zoom-in group select-none touch-none"
          onClick={() => !didDrag.current && setIsZoomed(!isZoomed)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary via-brand-primary/60 to-transparent opacity-90 z-30" />

          <div
            className="flex h-full transition-transform duration-500 ease-out will-change-transform"
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${(activeImage * 100) / images.length}%)`,
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="relative h-full shrink-0 overflow-hidden"
                style={{ width: `${100 / images.length}%` }}
              >
                <Image
                  src={img}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className={`object-cover transition-transform duration-700 ease-out pointer-events-none ${isZoomed && activeImage === i ? "scale-150" : "scale-100 group-hover:scale-[1.03]"}`}
                  draggable={false}
                  priority={i === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-surface-primary/70 via-transparent to-surface-primary/10 pointer-events-none z-10" />

          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 z-20">
            <PhotoIcon className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[11px] font-mono text-white/80 font-medium">
              {activeImage + 1} / {images.length}
            </span>
          </div>

          <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
            <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white/90 uppercase tracking-widest">
              {lotNumber}
            </span>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1)); setIsZoomed(false); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1)); setIsZoomed(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setActiveImage(i); setIsZoomed(false); }}
              className={`relative w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${activeImage === i
                ? "border-brand-primary shadow-[0_0_20px_rgba(240,165,0,0.25)] scale-[1.05]"
                : "border-border-primary opacity-40 hover:opacity-80 hover:border-border-primary/80"
                }`}
            >
              <Image
                src={img}
                alt={`${title} ${i + 1}`}
                fill
                sizes="72px"
                className="object-cover"
                unoptimized
              />
              {activeImage === i && (
                <div className="absolute inset-0 border-2 border-brand-primary rounded-[10px]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[11px] font-bold uppercase tracking-wider">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
          {category}
        </span>
        <div className="w-1 h-1 rounded-full bg-content-tertiary/30" />
        <span className="text-[11px] text-content-tertiary font-mono" suppressHydrationWarning>
          Published {formatDateTime(publishedAt)}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="h-px w-5 bg-brand-primary/50" />
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-content-tertiary">
            Description
          </h3>
        </div>
        <p className="text-[15px] text-content-secondary leading-[1.8] pl-7">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border-primary/40 rounded-[16px] border border-border-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-brand-primary via-brand-primary/40 to-transparent opacity-60 z-10" />

        {attributes.map((attr, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 p-5 relative bg-surface-secondary/90 backdrop-blur-md hover:bg-surface-tertiary transition-colors"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-content-tertiary">
              {attr.label}
            </span>
            <span className="text-[14px] font-bold text-content-primary">
              {attr.value}
            </span>
          </div>
        ))}
      </div>
    </div>

  );
};
