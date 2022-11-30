export interface IProduct {
  brand: string;
  model: string;
  photoUrl: string[];
  cost: number;
  description: string;
  name?: string;
  slug?: string;
  type: string;
}

export interface IProductState {
  products: IProduct[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
