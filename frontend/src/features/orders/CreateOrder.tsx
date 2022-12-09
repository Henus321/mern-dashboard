import { Card } from "antd";
import OrderSettings from "./OrderSettings";
import OrderProducts from "./OrderProducts";

const CreateOrder = () => {
  return (
    <Card
      bodyStyle={{
        padding: "0",
      }}
      className="rounded-card"
      style={{ height: "100%" }}
    >
      <OrderProducts />
      <OrderSettings />
    </Card>
  );
};

export default CreateOrder;
