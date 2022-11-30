import React, { useEffect, useState } from "react";
import { Button, Card, Image, Carousel, Typography } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "./productsSlice";
import { beautifyCost } from "../../helpers/helpers";
import { productTabs } from "../../configs/TabsConfig";

const gridStyle: React.CSSProperties = {
  width: "33.33333%",
  display: "flex",
  flexDirection: "column",
};

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
        padding: "0px",
        minHeight: "50vh",
        display: "flex",
      }}
      className="rounded-card"
      activeTabKey={brand}
      tabList={productTabs}
      onTabChange={(brand) => onTabChange(brand)}
    >
      {isLoading && <Spinner />}
      {!isLoading &&
        products &&
        products.map((product) => (
          <Card.Grid hoverable key={product.name} style={gridStyle}>
            <Typography.Title
              level={4}
              className="text-center"
              style={{ marginBottom: 0 }}
            >
              {product.name}
            </Typography.Title>
            <Typography.Paragraph
              className="text-center"
              style={{ marginBottom: "5px" }}
            >
              {product.type}
            </Typography.Paragraph>
            <Carousel style={{ marginBottom: "10px" }}>
              {product.photoUrl.map((photo) => (
                <Image
                  key={photo}
                  width="100%"
                  style={{ objectFit: "cover" }}
                  src={photo}
                />
              ))}
            </Carousel>
            <Typography.Title
              level={5}
              className="text-center"
              style={{ marginBottom: 0 }}
            >
              {beautifyCost(product.cost)}
            </Typography.Title>
            <Typography.Paragraph
              className="text-justify"
              style={{ marginBottom: "10px" }}
            >
              {product.description}
            </Typography.Paragraph>

            <Button
              className="mt-auto"
              onClick={() => console.log(product.slug)}
            >
              Make an Order <IdcardOutlined />
            </Button>
          </Card.Grid>
        ))}
    </Card>
  );
};

export default Products;
