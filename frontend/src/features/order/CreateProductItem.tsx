import { Card, Typography, Image } from "antd";
import { useSearchParams } from "react-router-dom";
import { beautifyCost, capitalizeText } from "../../helpers";
import { useAppSelector } from "../../hooks";

const gridStyle: React.CSSProperties = {
  width: "25%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
};

const CreateProductItem = () => {
  const { products } = useAppSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const product = searchParams.get("product");

  const isHovered = (curProduct: string) => {
    return curProduct === product
      ? {
          ...gridStyle,
          boxShadow:
            "0 1px 2px -2px rgb(0 0 0 / 22%), 0 3px 6px 0 rgb(0 0 0 / 30%)",
        }
      : { ...gridStyle };
  };

  const onClick = (productId: string) => {
    const params = brand && productId ? { brand, product: productId } : "";

    setSearchParams(params);
  };

  return (
    <>
      {products.map((product) => (
        <Card.Grid
          onClick={() => onClick(product._id)}
          hoverable
          key={product.name}
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
            key={product.photoUrl[0]}
            width="100%"
            style={{ objectFit: "cover" }}
            src={product.photoUrl[0]}
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