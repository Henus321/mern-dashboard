import axios from "axios";
import { ICustomer } from "../../models/customers";
import { CUSTOMERS_URL } from "../../constants/Routes";

const fetchCustomers = async () => {
  const response = await axios.get(CUSTOMERS_URL + "/");

  return response.data.data.data?.reverse();
};

const createCustomer = async (customerData: ICustomer) => {
  const response = await axios.post(CUSTOMERS_URL + "/", customerData);

  return response.data;
};

const updateCustomer = async (customerData: ICustomer) => {
  const response = await axios.patch(
    CUSTOMERS_URL + `/${customerData._id}`,
    customerData
  );

  return response.data;
};

const deleteCustomer = async (id: string) => {
  const response = await axios.delete(CUSTOMERS_URL + `/${id}`);

  return response.data;
};

const customersService = {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

export default customersService;
