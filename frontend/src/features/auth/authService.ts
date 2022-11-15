import axios from "axios";
import { IUser } from "../../models/IUser";

const API_URL = "/api/v1/users/";

const register = async (userData: IUser) => {
  const response = await axios.post(API_URL + "registration", userData);

  return response.data;
};

const login = async (userData: IUser) => {
  const response = await axios.post(API_URL + "login", userData);

  return response.data;
};

// eslint-disable-next-line
const logout = async (_: any) => {
  const response = await axios(API_URL + "logout");

  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
