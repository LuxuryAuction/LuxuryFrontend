export interface ICategory {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  postingPrice: number;
  liveLots: number;
  isFrozen: boolean;
}

export type ICategoryUpdatePayload = {
  name: string;
  shortDescription: string;
  postingPrice: number;
  image?: File;
};

export type ICategoryCreatePayload = {
  id?: number;
  slug: string;
  name: string;
  shortDescription: string;
  image: File;
  postingPrice: number;
};