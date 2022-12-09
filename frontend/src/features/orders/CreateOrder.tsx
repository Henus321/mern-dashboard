import { Card, Divider } from "antd";
import ProductTabs from "./ProductTabs";

const CreateOrder = () => {
  return (
    <Card
      bodyStyle={{
        padding: "0",
      }}
      className="rounded-card"
      style={{ height: "100%" }}
    >
      <ProductTabs />
      <Divider style={{ fontSize: "20px", textAlign: "center" }}>
        Pick a Customer
      </Divider>
      <Divider style={{ fontSize: "20px", textAlign: "center" }}>
        Specify the Options
      </Divider>
    </Card>
  );
};

export default CreateOrder;
