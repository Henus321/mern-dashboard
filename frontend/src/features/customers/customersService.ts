import axios from "axios";
import { ICustomer } from "../../models";
import { CUSTOMERS_URL, WITH_CREDENTIALS } from "../../constants";

const fetchCustomers = async () => {
  const response = await axios.get(CUSTOMERS_URL + "/", WITH_CREDENTIALS);

  return response.data.data.data?.reverse();
};

const createCustomer = async (customerData: ICustomer) => {
  const response = await axios.post(
    CUSTOMERS_URL + "/",
    customerData,
    WITH_CREDENTIALS
  );

  return response.data;
};

const updateCustomer = async (customerData: ICustomer) => {
  const response = await axios.patch(
    CUSTOMERS_URL + `/${customerData._id}`,
    customerData,
    WITH_CREDENTIALS
  );

  return response.data;
};

const deleteCustomer = async (id: string) => {
  const response = await axios.delete(
    CUSTOMERS_URL + `/${id}`,
    WITH_CREDENTIALS
  );

  return response.data;
};

const customersService = {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

export default customersService;
