import { Card, Typography, Image, Grid } from "antd";
import { beautifyCost, capitalizeText, gridWidth } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setProduct } from "../products/productsSlice";

const { useBreakpoint } = Grid;

const EditProductItem = () => {
  const { product, products } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const { xs, sm, lg } = useBreakpoint();

  const gridStyle: React.CSSProperties = {
    width: gridWidth(xs, sm, lg),
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  };

  const isHovered = (curProduct: string) => {
    return curProduct === product
      ? {
          ...gridStyle,
          boxShadow:
            "0 1px 2px -2px rgb(0 0 0 / 22%), 0 3px 6px 0 rgb(0 0 0 / 30%)",
        }
      : { ...gridStyle };
  };

  const onClick = (product: string) => {
    dispatch(setProduct(product));
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

export default EditProductItem;
