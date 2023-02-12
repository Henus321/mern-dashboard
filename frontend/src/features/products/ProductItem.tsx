import React from "react";
import { Button, Card, Image, Typography } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import { createSearchParams, useNavigate } from "react-router-dom";
import { IProduct } from "../../models";
import { beautifyCost, capitalizeText, slugifyText } from "../../utils";
import { useAppDispatch } from "../../hooks";
import { CREATE_ORDER_ROUTE } from "../../constants";
import { reset } from "./productsSlice";

interface Props {
  product: IProduct;
}

const ProductItem: React.FC<Props> = ({ product }) => {
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
    <Card.Grid hoverable className="card-container flex flex-column">
      <Typography.Title
        level={4}
        className="text-center"
        style={{ marginBottom: 0 }}
      >
        {`${capitalizeText(product.brand)} ${product.model}`}
      </Typography.Title>
      <Typography.Paragraph
        className="text-center"
        style={{ marginBottom: "5px" }}
      >
        {product.type}
      </Typography.Paragraph>
      <Image
        width="100%"
        style={{ objectFit: "cover" }}
        src={product.photoUrl}
      />
      <Typography.Title
        level={5}
        className="text-center"
        style={{ marginBottom: 0, marginTop: "10px" }}
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
        data-testid={`${slugifyText(product.model)}-button`}
        className="rounded mt-auto"
        onClick={() => onCreate(product)}
      >
        Order this Car <IdcardOutlined />
      </Button>
    </Card.Grid>
  );
};

export default ProductItem;
