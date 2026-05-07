export type LotCondition = "new" | "like-new" | "good" | "fair" | "poor";
export type LotDelivery = "nova-poshta" | "ukr-poshta" | "both" | "pickup";

export interface ICreateLotFormData {
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  sex?: string;
  size?: string;
  startingPrice: string;
  minBidIncrement: string;
  startDate: string;
  delivery: string;
  images: File[];
}

export const INITIAL_FORM: ICreateLotFormData = {
  title: "",
  description: "",
  categoryId: "",
  condition: "",
  sex: "",
  size: "",
  startingPrice: "",
  minBidIncrement: "",
  startDate: "",
  delivery: "",
  images: [],
};
