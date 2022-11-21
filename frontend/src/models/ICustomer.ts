export interface ICustomer {
  key: React.Key;
  name: string;
  phone: string;
  email: string;
  social: string | null;
  city: string;
  id: string;
}

export interface ICustomerState {
  customers: ICustomer[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
