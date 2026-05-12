export interface ICategory {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  postingPrice: number;
  isFrozen: boolean;
}

export type ICategoryUpdatePayload = Pick<ICategory, "name" | "shortDescription" | "image" | "postingPrice">;