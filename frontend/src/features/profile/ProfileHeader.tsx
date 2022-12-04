import React from "react";
import { Row, Col, Typography, Avatar, Button } from "antd";
import { IUser } from "../../models/IUser";
import { EditOutlined } from "@ant-design/icons";

interface ProfileHeaderProps {
  user: IUser;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <Row gutter={12} style={{ marginBottom: "15px" }}>
      <Col>
        <Avatar size={150} src={user.avatarUrl} />
      </Col>
      <Col>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {user.name}
        </Typography.Title>
        <Typography.Text>{user.email}</Typography.Text>
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
