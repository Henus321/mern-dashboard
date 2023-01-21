import React, { useEffect, useState } from "react";
import {
  Card,
  notification,
  Typography,
  Pagination,
  PaginationProps,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchProducts, reset } from "../productsSlice";
import { brandTabsWithNoFilter } from "../../../configs";
import { useSearchParams } from "react-router-dom";
import { getPaginationData, getProductsHeight } from "../../../utils";
import { DEFAULT_PAGE, ERROR_DURATION, PAGE_SIZE } from "../../../constants";

import ProductItem from "../ProductItem";
import Spinner from "../../../components/Spinner";

const Products = () => {
  const { products, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.products
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("brand") && searchParams.get("brand");
  const brand = params ? params : "";

  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE);
  const { pageStart, pageEnd } = getPaginationData(pageNumber);
  const { cardHeight, cardBodyHeight } = getProductsHeight(isLoading, products);

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
    setPageNumber(DEFAULT_PAGE);

    const params = brand ? { brand } : "";
    setSearchParams(params);
  };

  const onPageChange: PaginationProps["onChange"] = (page) => {
    setPageNumber(page);
  };

  return (
    <Card
      data-testid="products-card"
      bodyStyle={{
        padding: "0",
        display: "flex",
        flexWrap: "wrap",
        height: cardBodyHeight,
      }}
      style={{ height: cardHeight }}
      className="rounded-card"
      activeTabKey={brand}
      tabList={brandTabsWithNoFilter}
      onTabChange={(brand) => onTabChange(brand)}
    >
      {isLoading && <Spinner />}
      {!isLoading && products.length > 0 && (
        <>
          {products.slice(pageStart, pageEnd).map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
          <div className="w-full flex justify-end p-16 border-top">
            <Pagination
              current={pageNumber}
              onChange={onPageChange}
              pageSize={PAGE_SIZE}
              total={products.length}
            />
          </div>
        </>
      )}
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
  );
};

export default Products;
