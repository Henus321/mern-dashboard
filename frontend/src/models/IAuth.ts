import { IUser } from "./IUser";

export interface IAuth {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
