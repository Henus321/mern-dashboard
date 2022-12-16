import React from "react";
import { Row, Col, Card } from "antd";

import ProfileMenu from "./ProfileMenu";

interface Props {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  return (
    <Card
      bodyStyle={{
        padding: "0",
        height: "100%",
      }}
      className="rounded-card"
      style={{ height: "100%" }}
    >
      <Row style={{ height: "100%" }}>
        <Col span={4}>
          <ProfileMenu />
        </Col>
        <Col span={20} style={{ padding: "25px" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileLayout;
