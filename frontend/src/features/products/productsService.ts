import axios from "axios";
import { IProduct } from "../../models";
import { PRODUCTS_URL } from "../../constants";

const fetchProducts = async (brand: string) => {
  const response = await axios.get(PRODUCTS_URL + `/${brand}`);

  return response.data.data.data?.reverse();
};

const createProduct = async (userData: IProduct) => {
  const response = await axios.post(PRODUCTS_URL + "/", userData);

  return response.data;
};

const productsService = {
  fetchProducts,
  createProduct,
};

export default productsService;
