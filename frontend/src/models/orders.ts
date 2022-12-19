import { IOrder } from "./order";

export interface IOrdersState {
  orders: IOrder[] | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isModified: boolean;
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
