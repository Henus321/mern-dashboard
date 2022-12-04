import React from "react";
import { Row, Col, Card } from "antd";
import ProfileMenu from "./ProfileMenu";
import { Outlet } from "react-router-dom";

const Profile = () => {
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

export default Profile;
