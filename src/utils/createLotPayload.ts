import type { ICreateLotRequest } from "@/src/services/LotsService/types";
import type { ICreateLotFormData } from "@/src/views/Auction/CreateLot/types";

export function buildCreateLotRequest(data: ICreateLotFormData): ICreateLotRequest {
  return {
    name: data.title,
    description: data.description,
    categoryId: Number(data.categoryId),
    startingPrice: Number(data.startingPrice),
    priceStep: Number(data.minBidIncrement) || 10,
    startDate: new Date(data.startDate).toISOString(),
    draft: false,
    sex: data.sex || "unisex",
    condition: data.condition,
    size: data.size || "onesize",
    deliveryMethod: data.delivery,
    images: data.images,
  };
}
