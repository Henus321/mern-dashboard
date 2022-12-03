export interface IUser {
  email: string;
  password: string;
  passwordConfirm?: string;
  name?: string;
  avatarUrl?: string;
  username?: string;
  company?: string;
  phone?: string;
  website?: string;
  address?: string;
  about?: string;
  portfolio?: string;
}

export interface IUserState {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
