export interface ICategory {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  postingPrice: number;
  liveLots: number;
  isFrozen: boolean;
}

export type ICategoryUpdatePayload = Pick<ICategory, "name" | "shortDescription" | "image" | "postingPrice">;