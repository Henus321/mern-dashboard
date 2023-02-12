import { Moment } from "moment";
import { ICustomer } from "./customers";
import { IProduct } from "./products";
import { IState } from "./shared";

export interface IOrder {
  customer: ICustomer;
  delivery: Moment;
  _id: string;
  build: string;
  number: number;
  payment: string[];
  product: IProduct;
}

export interface IOrdersState extends IState {
  orders: IOrder[];
  order: IOrder | null;
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
