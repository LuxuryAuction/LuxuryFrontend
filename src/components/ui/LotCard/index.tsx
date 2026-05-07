import { LotCardProps } from "./types";
import { GridVariant } from "./components/GridVariant";
import { ListVariant } from "./components/ListVariant";

export * from "./types";
export * from "./constants";

export const LotCard = ({ lot, variant = "grid", showCategory = true }: LotCardProps) => {
  return variant === "list"
    ? <ListVariant lot={lot} showCategory={showCategory} />
    : <GridVariant lot={lot} showCategory={showCategory} />;
};

export default LotCard;
