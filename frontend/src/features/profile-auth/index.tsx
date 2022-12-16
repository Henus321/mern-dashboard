import React from "react";
import { Row, Col, Card } from "antd";
import { Outlet } from "react-router-dom";

import ProfileMenu from "./ProfileMenu";

const ProfileLayout = () => {
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
          <Outlet />
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileLayout;
