import axios from "axios";
import { ICustomer } from "../../models";
import { CUSTOMERS_URL } from "../../constants";

const fetchCustomers = async () => {
  const response = await axios.get(CUSTOMERS_URL + "/");

  return response.data.data.data;
};

const createCustomer = async (customerData: ICustomer) => {
  const response = await axios.post(CUSTOMERS_URL + "/", customerData);

  return response.data.data.data;
};

const updateCustomer = async (customerData: ICustomer) => {
  const response = await axios.patch(
    CUSTOMERS_URL + `/${customerData._id}`,
    customerData
  );

  return response.data.data.data;
};

const deleteCustomer = async (id: string) => {
  const response = await axios.delete(CUSTOMERS_URL + `/${id}`);

  return response.data.data.data;
};

const customersService = {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

export default customersService;
