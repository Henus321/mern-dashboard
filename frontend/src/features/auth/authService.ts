import axios from "axios";
import { IUser } from "../../models/IUser";
import { USERS_URL } from "../../constants/Routes";

const register = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/registration", userData);

  return response.data;
};

const login = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/login", userData);

  return response.data;
};

// eslint-disable-next-line
const logout = async (_: any) => {
  const response = await axios(USERS_URL + "/logout");

  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
