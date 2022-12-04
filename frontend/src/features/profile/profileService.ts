import axios from "axios";
import { IPortfolio, IUser } from "../../models/IUser";
import { USERS_URL, PORTFOLIO_URL } from "../../constants/Routes";

const fetchUser = async () => {
  const response = await axios.get(USERS_URL + "/me");

  return response.data.data.data;
};

const updateUser = async (userData: IUser) => {
  const response = await axios.patch(USERS_URL + "/me", userData);

  return response.data.data.data;
};

const createPortfolio = async (portfolioData: IPortfolio) => {
  const response = await axios.post(PORTFOLIO_URL, portfolioData);
  console.log("create");
  return response.data.data.data;
};

const updatePortfolio = async (portfolioData: IPortfolio) => {
  const response = await axios.patch(PORTFOLIO_URL, portfolioData);
  console.log("update");
  return response.data.data.data;
};

const profileService = {
  fetchUser,
  updateUser,
  createPortfolio,
  updatePortfolio,
};

export default profileService;
