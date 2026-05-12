import AuctionRulesView from "@/src/views/AuctionRules";

export const metadata = {
  title: "Правила аукціону | BidVault",
  description:
    "Обов’язкові правила аукціону, можливі санкції та корисні матеріали в Telegraph: ставки, оплата, відправка, бан.",
};

const AuctionRulesPage = () => {
  return <AuctionRulesView />;
}


export default AuctionRulesPage;