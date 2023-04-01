import React from "react";
import { Card, Divider, Image } from "antd";

import pageNotFound from "@/assets/page-not-found.png";

interface Props {
  type: string;
}

export const NotFound: React.FC<Props> = ({ type }) => {
  return (
    <Card
      bodyStyle={{
        padding: "0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="rounded-card"
      style={{ height: "100%" }}
    >
      <div style={{ margin: "auto" }}>
        <Image
          width={"100%"}
          preview={false}
          src={pageNotFound}
          alt="Order not Found"
        />
        <Divider
          className="text-center"
          style={{ fontSize: "24px", padding: "0 25px" }}
        >
          {type} not Found
        </Divider>
      </div>
    </Card>
  );
};
