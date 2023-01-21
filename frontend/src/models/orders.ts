import { Moment } from "moment";
import { ICustomer } from "./customers";
import { IProduct } from "./products";

export interface IOrder {
  customer: ICustomer;
  delivery: Moment;
  _id: string;
  build: string;
  number: number;
  payment: string[];
  product: IProduct;
}

export interface IOrdersState {
  orders: IOrder[];
  order: IOrder | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface IOrdersTable {
  key: string;
  customer: string;
  photoUrl: string;
  brand: string;
  model: string;
  id: string;
  number: number;
  build: string;
  payment: string;
  cost: number;
  delivery: string;
}

export interface IOrderProduct {
  order?: IOrder;
}

export interface IOrderProductItem {
  currentProduct: IProduct;
  prefilledActiveProductId: string;
}
