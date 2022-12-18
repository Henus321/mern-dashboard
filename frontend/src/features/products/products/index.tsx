import React, { useEffect } from "react";
import { Card, notification } from "antd";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchProducts, reset } from "../productsSlice";
import { brandTabsWithNoFilter } from "../../../configs";
import { useSearchParams } from "react-router-dom";
import { ERROR_DURATION } from "../../../constants";

import ProductItem from "../ProductItem";
import NotFound from "../../../components/NotFound";

const Products = () => {
  const { products, isLoading, isError, message } = useAppSelector(
    (state) => state.products
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("brand") && searchParams.get("brand");
  const brand = params ? params : "";

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }

    return () => {
      if (isError) {
        dispatch(reset());
      }
    };
  }, [dispatch, isError, message]);

  useEffect(() => {
    dispatch(fetchProducts(brand));
  }, [dispatch, brand]);

  const onTabChange = (brand: string) => {
    const params = brand ? { brand } : "";
    setSearchParams(params);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && isError && products.length === 0 && (
        <NotFound type="Products" />
      )}
      {!isLoading && products.length > 0 && (
        <Card
          bodyStyle={{
            padding: "0",
            display: "flex",
            flexWrap: "wrap",
          }}
          className="rounded-card"
          activeTabKey={brand}
          tabList={brandTabsWithNoFilter}
          onTabChange={(brand) => onTabChange(brand)}
        >
          {products.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
        </Card>
      )}
    </>
  );
};

export default Products;
