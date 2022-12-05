import axios from "axios";
import { IUser } from "../../models/IUser";
import { USERS_URL } from "../../constants/Routes";

const fetchUser = async () => {
  const response = await axios.get(USERS_URL + "/me");

  return response.data.data.data;
};

const updateUser = async (userData: IUser | Partial<IUser>) => {
  const response = await axios.patch(USERS_URL + "/me", userData);

  return response.data.data.data;
};

const profileService = {
  fetchUser,
  updateUser,
};

export default profileService;
