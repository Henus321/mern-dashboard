import axios from "axios";
import { IUser } from "../../models/IUser";
import { USERS_URL } from "../../constants/Routes";

const register = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/registration", userData);

  if (response.data.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data.data));
  }

  return response.data.data.data;
};

const login = async (userData: IUser) => {
  const response = await axios.post(USERS_URL + "/login", userData);

  if (response.data.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data.data));
  }

  return response.data.data.data;
};

const logout = async () => {
  const response = await axios.get(USERS_URL + "/logout");

  if (response.data) {
    localStorage.removeItem("user");
  }

  return response.data;
};

const fetchUser = async () => {
  const response = await axios.get(USERS_URL + "/me");

  if (response.data.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data.data));
  }

  return response.data.data.data;
};

const updateUser = async (userData: Partial<IUser> | FormData) => {
  const response = await axios.patch(USERS_URL + "/me", userData);

  if (response.data.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data.data));
  }

  return response.data.data.data;
};

const userService = {
  register,
  logout,
  login,
  fetchUser,
  updateUser,
};

export default userService;
