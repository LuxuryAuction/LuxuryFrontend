import { AUCTION_GUIDE_LINKS, STRICT_AUCTION_RULES } from "./auctionRules.config";
import AuctionRulesGuideSection from "./components/AuctionRulesGuideSection";
import AuctionRulesPageFooter from "./components/AuctionRulesPageFooter";
import AuctionRulesStrictSection from "./components/AuctionRulesStrictSection";

const AuctionRulesView = () => {
  return (
    <div className="p-5 md:p-7 pb-16">
      <div className="max-w-6xl mx-auto">
        <AuctionRulesStrictSection rules={STRICT_AUCTION_RULES} />
        <AuctionRulesGuideSection links={AUCTION_GUIDE_LINKS} />
        <AuctionRulesPageFooter />
      </div>
    </div>
  );
}

export default AuctionRulesView