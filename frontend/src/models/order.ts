import { Moment } from "moment";
import { ICustomer } from "./customers";
import { IProduct } from "./products";

export interface IOrder {
  customer: ICustomer;
  delivery: Moment;
  _id: string;
  assembly: string;
  number: number;
  payment: string[];
  product: IProduct;
}

export interface IOrderState {
  order: IOrder | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isModified: boolean;
  message: string;
}

export interface IOrderProps {
  order: IOrder;
}
