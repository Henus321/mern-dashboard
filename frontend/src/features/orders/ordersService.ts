import axios from "axios";
import { ORDERS_URL, WITH_CREDENTIALS } from "../../constants";

const fetchOrders = async () => {
  const response = await axios.get(ORDERS_URL + "/", WITH_CREDENTIALS);

  return response.data.data.data;
};

const deleteOrder = async (id: string) => {
  const response = await axios.delete(ORDERS_URL + `/${id}`, WITH_CREDENTIALS);

  return response.data;
};

const ordersService = {
  fetchOrders,
  deleteOrder,
};

export default ordersService;
