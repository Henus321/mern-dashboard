import { Moment } from "moment";
import { ICustomer } from "./ICustomer";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IOrder {
  customer: ICustomer;
  delivery: Moment;
  _id: string;
  assembly: string;
  number: number;
  payment: string[];
  product: IProduct;
  registration: Moment;
  manager: IUser;
}

export interface IOrdersState {
  orders: IOrder[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface IOrdersTable {
  customer?: string;
  photoUrl: string;
  brand: string;
  product?: string;
  id: string;
  number: number;
  assembly: string;
  payment: string;
  cost: string;
  registration: string;
  delivery: string;
  manager?: string;
}

export interface IOrdersTableProps {
  orders: IOrder[];
}
