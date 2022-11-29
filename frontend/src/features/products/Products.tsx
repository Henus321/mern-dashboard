import React, { useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "./productsSlice";

const Products = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>Products</div>;
};

export default Products;
