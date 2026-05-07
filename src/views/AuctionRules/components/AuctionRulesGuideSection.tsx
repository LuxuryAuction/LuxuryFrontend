import type { AuctionGuideLink } from "../types";
import AuctionRulesGuideCard from "./AuctionRulesGuideCard";

interface AuctionRulesGuideSectionProps {
  links: AuctionGuideLink[];
}

const AuctionRulesGuideSection = ({ links }: AuctionRulesGuideSectionProps) => {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <h2 className="text-lg md:text-xl font-extrabold text-content-primary tracking-tight uppercase italic shrink-0">
          Корисні матеріали
        </h2>
        <div className="h-px flex-1 bg-border-primary hidden sm:block" />
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
          🟡 Telegraph
        </span>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
        }}
      >
        {links.map((item) => (
          <AuctionRulesGuideCard key={item.href} link={item} />
        ))}
      </div>
    </section>
  );
}

export default AuctionRulesGuideSection;