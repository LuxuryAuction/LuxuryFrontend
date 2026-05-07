import { OpenLinkIcon } from "@/public/assets/icons";
import type { AuctionGuideLink } from "../types";

interface AuctionRulesGuideCardProps {
  link: AuctionGuideLink;
}

const AuctionRulesGuideCard = ({ link }: AuctionRulesGuideCardProps) => {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 p-5 rounded-2xl border border-border-primary bg-surface-secondary hover:border-brand-primary/40 hover:bg-surface-tertiary/80 transition-all duration-300 animate-bvCatFadeUp"
    >
      <span className="mt-0.5 text-brand-primary text-base shrink-0" aria-hidden>
        🟡
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[14px] font-bold text-content-primary group-hover:text-content-light leading-snug">
          {link.title}
        </span>
        <span className="mt-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-brand-primary/90 group-hover:text-brand-primary">
          Читати на Telegraph
          <OpenLinkIcon className="text-brand-primary w-4 h-4" />
        </span>
      </span>
    </a>
  );
}

export default AuctionRulesGuideCard;