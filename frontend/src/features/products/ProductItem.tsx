import React from "react";
import { Button, Card, Image, Carousel, Typography, Grid } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import { createSearchParams, useNavigate } from "react-router-dom";
import { IProduct, IProductItemProps } from "../../models";
import { beautifyCost, gridWidth } from "../../helpers";
import { useAppDispatch } from "../../hooks";
import { CREATE_ORDER_ROUTE } from "../../constants";
import { reset } from "./productsSlice";

const { useBreakpoint } = Grid;

const ProductItem: React.FC<IProductItemProps> = ({ product }) => {
  const { xs, sm, lg } = useBreakpoint();

  const gridStyle: React.CSSProperties = {
    width: gridWidth(xs, sm, lg),
    display: "flex",
    flexDirection: "column",
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onCreate = (product: IProduct) => {
    const params = { brand: product.brand, product: product._id };
    dispatch(reset());
    navigate({
      pathname: CREATE_ORDER_ROUTE,
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <Card.Grid hoverable style={gridStyle}>
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
      {lg ? (
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
      ) : (
        <Image
          key={product.photoUrl[0]}
          width="100%"
          style={{ objectFit: "cover" }}
          src={product.photoUrl[0]}
        />
      )}
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
      {lg && (
        <Button className="rounded mt-auto" onClick={() => onCreate(product)}>
          Make an Order <IdcardOutlined />
        </Button>
      )}
    </Card.Grid>
  );
};

export default ProductItem;
