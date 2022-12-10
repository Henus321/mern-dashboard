import { Card, Typography } from "antd";
import OrderSettings from "./OrderSettings";
import OrderProducts from "./OrderProducts";

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
      <OrderProducts />
      <OrderSettings />
    </Card>
  );
};

export default CreateOrder;
