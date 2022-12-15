import axios from "axios";
import { ICustomer } from "../../models/customers";
import { CUSTOMERS_URL } from "../../constants/Routes";

const fetchCustomers = async () => {
  const response = await axios.get(CUSTOMERS_URL + "/");

  return response.data.data.data?.reverse();
};

const createCustomer = async (userData: ICustomer) => {
  const response = await axios.post(CUSTOMERS_URL + "/", userData);

  return response.data;
};

const updateCustomer = async (userData: ICustomer) => {
  const response = await axios.patch(CUSTOMERS_URL + "/", userData);

  return response.data;
};

const deleteCustomer = async (id: string) => {
  const config = {
    data: {
      id,
    },
  };
  const response = await axios.delete(CUSTOMERS_URL + "/", config);

  return response.data;
};

const customersService = {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

export default customersService;
