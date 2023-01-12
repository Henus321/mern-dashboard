import axios from "axios";
import { IUser } from "../../models";
import { USERS_URL } from "../../constants";

const register = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/registration", userData);

  return response.data;
};

const login = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/login", userData);

  return response.data;
};

const logout = async () => {
  const response = await axios.get(USERS_URL + "/logout");

  return response.data;
};

const fetchUser = async () => {
  const response = await axios.get(USERS_URL + "/me");

  return response.data.data.data;
};

const updateUser = async (userData: Partial<IUser> | FormData) => {
  const response = await axios.patch(USERS_URL + "/me", userData);

  return response.data.data.data;
};

const passwordChange = async (userData: Partial<IUser>) => {
  const response = await axios.patch(USERS_URL + "/password-change", userData);

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  fetchUser,
  updateUser,
  passwordChange,
};

export default authService;
