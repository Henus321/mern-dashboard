import axios from "axios";
import { IUser } from "../../models/IUser";

const API_URL = "/api/v1/users/";

const register = async (userData: IUser) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: IUser) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  logout,
  login,
};

export default authService;
