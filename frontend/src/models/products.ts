import { IState } from "./shared";

export interface IProduct {
  brand: string;
  model: string;
  photoUrl: string;
  cost: number;
  description: string;
  name?: string;
  slug?: string;
  type: string;
  _id: string;
}

export interface IProductState extends IState {
  products: IProduct[];
  product: string;
}
