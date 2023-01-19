import { Card, Typography, Image } from "antd";
import { useSearchParams } from "react-router-dom";
import { beautifyCost, capitalizeText } from "../../utils";
import { useAppSelector } from "../../hooks";

const CreateProductItem = () => {
  const { products } = useAppSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const product = searchParams.get("product");

  const isHovered = (curProduct: string) => {
    return curProduct === product
      ? {
          cursor: "pointer",
          boxShadow:
            "0 1px 2px -2px rgb(0 0 0 / 22%), 0 3px 6px 0 rgb(0 0 0 / 30%)",
        }
      : { cursor: "pointer" };
  };

  const onClick = (productId: string) => {
    const params = brand && productId ? { brand, product: productId } : "";

    setSearchParams(params);
  };

  return (
    <>
      {products.map((product) => (
        <Card.Grid
          className="card-container flex flex-column"
          onClick={() => onClick(product._id)}
          hoverable
          key={product._id}
          style={isHovered(product._id)}
        >
          <Typography.Title
            level={5}
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
            preview={false}
            width="100%"
            style={{ objectFit: "cover" }}
            src={product.photoUrl}
          />
          <Typography.Title
            level={5}
            className="text-center"
            style={{ marginBottom: 0 }}
          >
            {beautifyCost(product.cost)}
          </Typography.Title>
        </Card.Grid>
      ))}
    </>
  );
};

export default CreateProductItem;