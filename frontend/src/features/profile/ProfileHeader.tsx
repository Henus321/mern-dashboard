import React from "react";
import { Row, Col, Typography, Avatar, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const ProfileHeader = () => {
  const avatarUrl =
    "https://images.unsplash.com/photo-1608831540955-35094d48694a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=826&q=80";

  return (
    <Row gutter={12} style={{ marginBottom: "15px" }}>
      <Col>
        <Avatar size={150} src={avatarUrl} />
      </Col>
      <Col>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Alexander Erkhov
        </Typography.Title>
        <Typography.Text> Tyrant321@yandex.ru</Typography.Text>
        <br />
        <Button type="dashed" className="rounded mt-5">
          Change Avatar
          <EditOutlined />
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileHeader;
