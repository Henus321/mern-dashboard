import axios from "axios";
import { PRODUCTS_URL } from "../../constants";

const fetchProducts = async (brand: string) => {
  const response = await axios.get(PRODUCTS_URL + `/${brand}`);

  return response.data.data.data;
};

const productsService = {
  fetchProducts,
};

export default productsService;
