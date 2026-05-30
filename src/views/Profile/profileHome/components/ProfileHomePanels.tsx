"use client";

import { useRef, useState } from "react";
import type { IProfileAchievements, IProfileBadge } from "../profileHome.types";
import { CollectionProgress } from "./CollectionProgress";
import { BadgeShowcase } from "./BadgeShowcase";

const PANE_COUNT = 2;

interface ProfileHomePanelsProps {
  achievements: IProfileAchievements;
  showcaseBadges: IProfileBadge[];
  nextBadge?: IProfileBadge | null;
  isMe?: boolean;
}

/**
 * On mobile the "Progress" and "Showcase" blocks become a swipeable pager
 * with dot indicators; on desktop (sm+) both blocks are stacked.
 */
export function ProfileHomePanels({
  achievements,
  showcaseBadges,
  nextBadge = null,
  isMe = false,
}: ProfileHomePanelsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const stride = el.scrollWidth / PANE_COUNT;
    if (stride > 0) setActiveIndex(Math.round(el.scrollLeft / stride));
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const stride = el.scrollWidth / PANE_COUNT;
    el.scrollTo({ left: stride * index, behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:block sm:overflow-visible"
      >
        <div className="w-full shrink-0 snap-center">
          <CollectionProgress achievements={achievements} nextBadge={nextBadge} />
        </div>
        <div className="w-full shrink-0 snap-center">
          <BadgeShowcase badges={showcaseBadges} isMe={isMe} />
        </div>
      </div>

      <div className="flex justify-center gap-1.5 pb-4 sm:hidden">
        {Array.from({ length: PANE_COUNT }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-4 bg-brand-primary" : "w-1.5 bg-content-tertiary/30"
            }`}
          />
        ))}
      </div>
    </>
  );
}
