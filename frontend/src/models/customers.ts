import { IState } from "./shared";

export interface ICustomer {
  key: React.Key;
  name: string;
  phone: string;
  email: string;
  social: string | null;
  city: string;
  _id: string;
}

export interface ICustomerState extends IState {
  customers: ICustomer[];
  customer: ICustomer | null;
}
