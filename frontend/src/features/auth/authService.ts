import axios from "axios";
import { IUser } from "../../models/IUser";
import { USERS_URL } from "../../constants/Routes";

const register = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/registration", userData);

  return response.data.data.data;
};

const login = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/login", userData);

  return response.data.data.data;
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

const authService = {
  register,
  logout,
  login,
  fetchUser,
  updateUser,
};

export default authService;
