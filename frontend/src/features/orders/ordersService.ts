import axios from "axios";
import { ORDERS_URL } from "../../constants/Routes";

const fetchOrders = async () => {
  const response = await axios.get(ORDERS_URL + "/");

  return response.data.data.data;
};

const ordersService = {
  fetchOrders,
};

export default ordersService;
