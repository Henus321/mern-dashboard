import axios from "axios";
import { IUser } from "../../models";
import { USERS_URL, WITH_CREDENTIALS } from "../../constants";

const register = async (userData: IUser) => {
  const response = await axios.post(
    USERS_URL + "/registration",
    userData,
    WITH_CREDENTIALS
  );

  return response.data.data.data;
};

const login = async (userData: IUser) => {
  const response = await axios.post(
    USERS_URL + "/login",
    userData,
    WITH_CREDENTIALS
  );

  return response.data.data.data;
};

const logout = async () => {
  const response = await axios.get(USERS_URL + "/logout", WITH_CREDENTIALS);

  return response.data;
};

const fetchUser = async () => {
  const response = await axios.get(USERS_URL + "/me", WITH_CREDENTIALS);

  return response.data.data.data;
};

const updateUser = async (userData: Partial<IUser> | FormData) => {
  const response = await axios.patch(
    USERS_URL + "/me",
    userData,
    WITH_CREDENTIALS
  );

  return response.data.data.data;
};

const passwordChange = async (userData: Partial<IUser>) => {
  const response = await axios.patch(
    USERS_URL + "/password-change",
    userData,
    WITH_CREDENTIALS
  );

  return response.data.data.data;
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
