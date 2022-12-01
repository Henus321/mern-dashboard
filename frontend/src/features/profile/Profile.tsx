import React from "react";
import { Row, Col, Card } from "antd";
import ProfileMenu from "./ProfileMenu";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <Card
      bodyStyle={{
        padding: "0",
      }}
      className="rounded-card"
    >
      <Row>
        <Col span={4}>
          <ProfileMenu />
        </Col>
        <Col span={20} style={{ padding: "25px", marginBottom: "25px" }}>
          <Outlet />
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;
