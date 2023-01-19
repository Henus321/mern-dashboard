import axios from "axios";
import { ORDERS_URL } from "../../constants";
import { IOrder } from "../../models";

const fetchOrders = async () => {
  const response = await axios.get(ORDERS_URL + "/");

  return response.data.data.data;
};

const deleteOrder = async (id: string) => {
  const response = await axios.delete(ORDERS_URL + `/${id}`);

  return response.data.data.data;
};

const createOrder = async (orderData: IOrder) => {
  const response = await axios.post(ORDERS_URL + "/", orderData);

  return response.data.data.data;
};

const fetchOrder = async (id: string) => {
  const response = await axios.get(ORDERS_URL + `/${id}`);

  return response.data.data.data;
};

const updateOrder = async (orderData: IOrder) => {
  const response = await axios.patch(
    ORDERS_URL + `/${orderData._id}`,
    orderData
  );

  return response.data.data.data;
};

const ordersService = {
  fetchOrders,
  deleteOrder,
  fetchOrder,
  createOrder,
  updateOrder,
};

export default ordersService;
