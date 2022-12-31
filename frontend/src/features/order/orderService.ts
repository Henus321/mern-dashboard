import axios from "axios";
import { ORDERS_URL, WITH_CREDENTIALS } from "../../constants";
import { IOrder } from "../../models";

const createOrder = async (orderData: IOrder) => {
  const response = await axios.post(
    ORDERS_URL + "/",
    orderData,
    WITH_CREDENTIALS
  );

  return response.data.data.data;
};

const fetchOrder = async (id: string) => {
  const response = await axios.get(ORDERS_URL + `/${id}`, WITH_CREDENTIALS);

  return response.data.data.data;
};

const updateOrder = async (orderData: IOrder) => {
  const response = await axios.patch(
    ORDERS_URL + `/${orderData._id}`,
    orderData,
    WITH_CREDENTIALS
  );

  return response.data.data.data;
};

const ordersService = {
  fetchOrder,
  createOrder,
  updateOrder,
};

export default ordersService;
