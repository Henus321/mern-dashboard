import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchProducts } from "../productsSlice";
import { brandTabsWithNoFilter } from "../../../configs";
import ProductItem from "../ProductItem";

const Products = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);
  const [brand, setBrand] = useState("");

  const onTabChange = (brand: string) => {
    setBrand(brand);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(brand));
  }, [dispatch, brand]);

  return (
    <Card
      bodyStyle={{
        padding: "0",
        minHeight: "50vh",
        display: "flex",
        flexWrap: "wrap",
      }}
      className="rounded-card"
      activeTabKey={brand}
      tabList={brandTabsWithNoFilter}
      onTabChange={(brand) => onTabChange(brand)}
    >
      {isLoading && <Spinner />}
      {!isLoading &&
        products &&
        products.map((product) => (
          <ProductItem key={product.name} product={product} />
        ))}
    </Card>
  );
};

export default Products;
