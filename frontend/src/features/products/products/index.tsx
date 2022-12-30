import React, { useEffect } from "react";
import { Card, notification, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchProducts, reset } from "../productsSlice";
import { brandTabsWithNoFilter } from "../../../configs";
import { useSearchParams } from "react-router-dom";
import { ERROR_DURATION } from "../../../constants";

import ProductItem from "../ProductItem";
import Spinner from "../../../components/Spinner";
import MobileReminder from "../../../components/MobileReminder";

const Products = () => {
  const { products, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.products
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("brand") && searchParams.get("brand");
  const brand = params ? params : "";

  const cardHeight = products.length > 0 ? "" : "100%";
  const cardBodyHeight = products.length > 0 ? "" : "calc(100% - 100px)";

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(brand));
  }, [dispatch, brand]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }

    return () => {
      if (isSuccess || isError) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isError, message]);

  const onTabChange = (brand: string) => {
    dispatch(reset());

    const params = brand ? { brand } : "";
    setSearchParams(params);
  };

  return (
    <>
      <Card
        bodyStyle={{
          padding: "0",
          display: "flex",
          flexWrap: "wrap",
          height: cardBodyHeight,
        }}
        style={{ height: cardHeight }}
        className="content-container rounded-card"
        activeTabKey={brand}
        tabList={brandTabsWithNoFilter}
        onTabChange={(brand) => onTabChange(brand)}
      >
        {isLoading && <Spinner />}
        {!isLoading &&
          products.length > 0 &&
          products.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
        {!isLoading && products.length === 0 && (
          <div className="flex w-full h-full">
            <div className="m-auto">
              <Typography.Title level={2} className="text-center">
                No Products Found
              </Typography.Title>
              <Typography.Paragraph className="text-center">
                Something went wrong...
              </Typography.Paragraph>
            </div>
          </div>
        )}
      </Card>
      <MobileReminder />
    </>
  );
};

export default Products;
