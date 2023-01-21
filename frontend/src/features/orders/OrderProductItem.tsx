import { Card, Typography, Image } from "antd";
import { useSearchParams } from "react-router-dom";
import { beautifyCost, capitalizeText, isCardActive } from "../../utils";
import { IOrderProductItem } from "../../models";
import { useAppDispatch } from "../../hooks";
import { setProduct } from "../products/productsSlice";

const OrderProductItem: React.FC<IOrderProductItem> = ({
  currentProduct,
  prefilledActiveProductId,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productParams = searchParams.get("product");
  const brandParams = searchParams.get("brand");

  const activeProductId = productParams
    ? productParams
    : prefilledActiveProductId;

  const dispatch = useAppDispatch();

  const onClick = (productId: string) => {
    // create-order case
    if (brandParams) {
      const params = { brand: brandParams, product: productId };

      setSearchParams(params);
    }
    // edit-order case
    if (!brandParams) {
      dispatch(setProduct(productId));
    }
  };

  return (
    <Card.Grid
      className="card-container flex flex-column cursor-pointer"
      onClick={() => onClick(currentProduct._id)}
      hoverable
      style={isCardActive(currentProduct._id, activeProductId)}
    >
      <Typography.Title
        level={5}
        className="text-center"
        style={{ marginBottom: 0 }}
      >
        {`${capitalizeText(currentProduct.brand)} ${currentProduct.model}`}
      </Typography.Title>
      <Typography.Paragraph
        className="text-center"
        style={{ marginBottom: "5px" }}
      >
        {currentProduct.type}
      </Typography.Paragraph>
      <Image
        preview={false}
        width="100%"
        style={{ objectFit: "cover" }}
        src={currentProduct.photoUrl}
      />
      <Typography.Title
        level={5}
        className="text-center"
        style={{ marginBottom: 0 }}
      >
        {beautifyCost(currentProduct.cost)}
      </Typography.Title>
    </Card.Grid>
  );
};

export default OrderProductItem;
