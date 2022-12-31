import axios from "axios";
import { IProduct } from "../../models";
import { PRODUCTS_URL, WITH_CREDENTIALS } from "../../constants";

const fetchProducts = async (brand: string) => {
  const response = await axios.get(
    PRODUCTS_URL + `/${brand}`,
    WITH_CREDENTIALS
  );

  return response.data.data.data?.reverse();
};

const createProduct = async (userData: IProduct) => {
  const response = await axios.post(
    PRODUCTS_URL + "/",
    userData,
    WITH_CREDENTIALS
  );

  return response.data;
};

const productsService = {
  fetchProducts,
  createProduct,
};

export default productsService;
