export interface IProduct {
  brand: string;
  model: string;
  photoUrl: string[];
  cost: number;
  description: string;
  name?: string;
  slug?: string;
  type: string;
  _id: string;
}

export interface IProductState {
  products: IProduct[];
  product: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface IProductItemProps {
  product: IProduct;
}
