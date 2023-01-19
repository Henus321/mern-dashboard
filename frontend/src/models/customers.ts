export interface ICustomer {
  key: React.Key;
  name: string;
  phone: string;
  email: string;
  social: string | null;
  city: string;
  _id: string;
}

export interface ICustomerState {
  customers: ICustomer[];
  customer: ICustomer | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
