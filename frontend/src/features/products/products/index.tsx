import React, { useEffect } from "react";
import { Card } from "antd";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchProducts } from "../productsSlice";
import { brandTabsWithNoFilter } from "../../../configs";
import ProductItem from "../ProductItem";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("brand") && searchParams.get("brand");
  const brand = params ? params : "";

  const dispatch = useAppDispatch();

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
        {!isLoading &&
          products &&
          products.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
      </Card>
    </>
  );
};

export default Products;
