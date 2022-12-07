export interface IUser {
  email: string;
  password: string;
  passwordConfirm?: string;
  name?: string;
  photo?: string;
  username?: string;
  company?: string;
  phone?: string;
  website?: string;
  address?: string;
  about?: string;
  portfolio?: IPortfolio;
}

export interface IPortfolio {
  description?: string;
  profession?: string;
  examples?: string[];
}

export interface IUserState {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  redirect: boolean;
}
