import { Card, Typography } from "antd";
import Settings from "./Settings";
import Product from "./Product";

const CreateOrder = () => {
  return (
    <Card
      bodyStyle={{
        padding: "0",
      }}
      className="rounded-card"
    >
      <Typography.Title className="mt-15 text-center" level={2}>
        Create an Order
      </Typography.Title>
      <Product />
      <Settings />
    </Card>
  );
};

export default CreateOrder;
