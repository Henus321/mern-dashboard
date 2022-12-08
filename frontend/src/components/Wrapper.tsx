import React from "react";
import { Card } from "antd";

interface WrapperProps {
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Card
      bodyStyle={{
        padding: "25px",
      }}
      className="rounded-card"
    >
      {children}
    </Card>
  );
};

export default Wrapper;
