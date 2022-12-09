import { Card, Typography, Image } from "antd";
import { beautifyCost, capitalizeText } from "../../helpers/helpers";
import { useAppSelector } from "../../hooks/redux";

interface Props {
  props: {
    isHovered: (arg0: string) => React.CSSProperties;
    setPick: (arg0: string) => void;
  };
}

const TabItem: React.FC<Props> = ({ props }) => {
  const { isHovered, setPick } = props;
  const { products } = useAppSelector((state) => state.products);

  return (
    <>
      {products.map((product) => (
        <Card.Grid
          onClick={() => setPick(product.model)}
          hoverable
          key={product.name}
          style={isHovered(product.model)}
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

export default TabItem;
