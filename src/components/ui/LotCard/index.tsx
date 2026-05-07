import { ILot } from "@/src/services/LotsService/types";
import { GridVariant } from "./components/GridVariant";
import { ListVariant } from "./components/ListVariant";
export * from "./constants";

export type ViewVariant = "grid" | "list";
export interface LotCardProps {
  lot: ILot;
  variant?: ViewVariant;
  showCategory?: boolean;
}


export const LotCard = ({ lot, variant = "grid", showCategory = true }: LotCardProps) => {
  return variant === "list"
    ? <ListVariant lot={lot} showCategory={showCategory} />
    : <GridVariant lot={lot} showCategory={showCategory} />;
};

export default LotCard;
