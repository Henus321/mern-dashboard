import { Moment } from "moment";
import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";

export interface IOrder {
  customer: ICustomer;
  delivery: Moment;
  _id: string;
  assembly: string;
  number: number;
  payment: string[];
  product: IProduct;
  registration: Moment;
}

export interface IOrdersState {
  orders: IOrder[];
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
  assembly: string;
  payment: string;
  cost: number;
  registration: string;
  delivery: string;
}

export interface IOrdersTableProps {
  orders: IOrder[];
}
