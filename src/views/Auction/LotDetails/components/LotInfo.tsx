"use client";

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, PhotoIcon } from "@/public/assets/icons";
import { formatDateTime } from "@/src/utils/textUtils";
import { LotNumber } from "@/src/components/ui/LotNumber";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("LotDetails");
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const imageCount = images.length;
  const hasMultipleImages = imageCount > 1;

  const goToPrev = useCallback(() => {
    if (imageCount === 0) return;
    setActiveImage((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  }, [imageCount]);

  const goToNext = useCallback(() => {
    if (imageCount === 0) return;
    setActiveImage((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  }, [imageCount]);

  const openLightbox = () => {
    if (imageCount > 0) setIsLightboxOpen(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen, goToPrev, goToNext]);

  const handlePointerDown = (e: React.PointerEvent) => {
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

    if (didDrag.current && hasMultipleImages) {
      if (delta < -50) goToNext();
      else if (delta > 50) goToPrev();
      didDrag.current = false;
    }
  };

  const handleGalleryClick = () => {
    if (!didDrag.current) openLightbox();
    didDrag.current = false;
  };

  const lightbox =
    isLightboxOpen && imageCount > 0 ? (
      <div
        className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <PhotoIcon className="w-4 h-4 text-white/60 shrink-0" />
            <span className="text-[12px] font-mono text-white/80 truncate">
              {activeImage + 1} / {imageCount}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label={t("gallery.close")}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer shrink-0"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div
          className="relative flex-1 flex items-center justify-center min-h-0 px-2 sm:px-12 touch-none select-none"
          onClick={() => setIsLightboxOpen(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="relative w-full h-full max-w-6xl max-h-[calc(100vh-10rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeImage]}
              alt={`${title} ${activeImage + 1}`}
              fill
              sizes="100vw"
              className="object-contain pointer-events-none"
              draggable={false}
              unoptimized
              priority
            />
          </div>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label={t("gallery.prev")}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:bg-black/70 transition-all cursor-pointer"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label={t("gallery.next")}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:bg-black/70 transition-all cursor-pointer"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {hasMultipleImages && (
          <div className="shrink-0 flex gap-2 overflow-x-auto px-4 pb-4 pt-2 sm:px-6 sm:justify-center">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                  activeImage === i
                    ? "border-brand-primary opacity-100"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={img} alt="" fill sizes="64px" className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {imageCount > 0 && (
          <>
            <div
              className="relative aspect-4/3 rounded-[16px] overflow-hidden border border-border-primary bg-surface-secondary shadow-2xl cursor-zoom-in group select-none touch-none"
              onClick={handleGalleryClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary via-brand-primary/60 to-transparent opacity-90 z-30" />

              <div
                className="flex h-full transition-transform duration-500 ease-out will-change-transform"
                style={{
                  width: `${imageCount * 100}%`,
                  transform: `translateX(-${(activeImage * 100) / imageCount}%)`,
                }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-full shrink-0 overflow-hidden"
                    style={{ width: `${100 / imageCount}%` }}
                  >
                    <Image
                      src={img}
                      alt={`${title} ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 900px"
                      className="object-cover transition-transform duration-700 ease-out pointer-events-none scale-100 group-hover:scale-[1.03]"
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
                  {activeImage + 1} / {imageCount}
                </span>
              </div>

              <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                <LotNumber lotNumber={lotNumber} variant="lg" tone="overlay" />
              </div>

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
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
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer ${
                    activeImage === i
                      ? "border-brand-primary"
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
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {isMounted && lightbox ? createPortal(lightbox, document.body) : null}

      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[11px] font-bold uppercase tracking-wider">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
          {category}
        </span>
        <div className="w-1 h-1 rounded-full bg-content-tertiary/30" />
        <span className="text-[11px] text-content-tertiary font-mono" suppressHydrationWarning>
          {t("published")} {formatDateTime(publishedAt)}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="h-px w-5 bg-brand-primary/50" />
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-content-tertiary">
            {t("description")}
          </h3>
        </div>
        <p className="text-[15px] text-content-secondary leading-[1.8] pl-7">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border-primary/40 rounded-[16px] border border-border-primary relative overflow-hidden">
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
