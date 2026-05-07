"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ImgPlaceholder } from "./ImgPlaceholder";
import { ChevronLeftIcon, ChevronRightIcon } from "@/public/assets/icons";

interface ImageCarouselProps {
  images?: string[];
  img?: string;
  category: string;
}

export const ImageCarousel = ({ images, img, category }: ImageCarouselProps) => {
  const allImages = images?.length ? images : img ? [img] : [];
  const [index, setIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);
  const count = allImages.length;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + count) % count);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % count);
  };

  const goTo = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(idx);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    dragStartX.current = e.clientX;
    didDrag.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 6) {
      didDrag.current = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (!didDrag.current) return;
    if (delta < -30) setIndex((i) => (i + 1) % count);
    else if (delta > 30) setIndex((i) => (i - 1 + count) % count);
  };

  // Prevent <Link> navigation after a swipe
  const onContainerClick = (e: React.MouseEvent) => {
    if (didDrag.current) {
      e.preventDefault();
      e.stopPropagation();
      didDrag.current = false;
    }
  };

  if (count === 0) {
    return (
      <div className="absolute inset-0">
        <ImgPlaceholder category={category} />
      </div>
    );
  }

  if (count === 1) {
    return (
      <div className="absolute inset-0">
        <Image
          src={allImages[0]}
          alt={category}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onContainerClick}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out will-change-transform"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${(index * 100) / count}%)`,
        }}
      >
        {allImages.map((src, i) => (
          <div
            key={i}
            className="relative h-full shrink-0"
            style={{ width: `${100 / count}%` }}
          >
            <Image
              src={src}
              alt={`${category} ${i + 1}`}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              draggable={false}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-150 cursor-pointer"
      >
        <ChevronLeftIcon className="w-3 h-3 text-white" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={next}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-150 cursor-pointer"
      >
        <ChevronRightIcon className="w-3 h-3 text-white" />
      </button>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
        {allImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => goTo(e, i)}
            aria-label={`Photo ${i + 1}`}
            className={`rounded-full transition-all duration-200 ${i === index
              ? "w-4 h-1.5 bg-white"
              : "w-1.5 h-1.5 bg-white/45 hover:bg-white/75"
              }`}
          />
        ))}
      </div>
    </div>
  );
};
