import React from "react";
import { Button, Card, Image, Carousel, Typography } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import { IProduct } from "../../models/IProduct";
import { beautifyCost } from "../../helpers/helpers";

interface Props {
  product: IProduct;
}

const gridStyle: React.CSSProperties = {
  width: "33.33333%",
  display: "flex",
  flexDirection: "column",
};

const ProductItem: React.FC<Props> = ({ product }) => {
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

      <Button className="mt-auto" onClick={() => console.log(product.slug)}>
        Make an Order <IdcardOutlined />
      </Button>
    </Card.Grid>
  );
};

export default ProductItem;
