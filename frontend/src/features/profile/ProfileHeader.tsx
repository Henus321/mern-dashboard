import React from "react";
import { Row, Col, Typography, Avatar, Button, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import { IProfileHeaderProps } from "../../models/auth";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { PHOTO_URL } from "../../constants/Routes";
import { useAppDispatch } from "../../hooks/redux";
import { reset, updateUser } from "../auth/authSlice";

import Logout from "../auth/Logout";

const ProfileHeader: React.FC<IProfileHeaderProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  const onSave = (file: RcFile) => {
    const formData = new FormData();
    formData.append("photo", file);

    dispatch(updateUser(formData));
    dispatch(reset());
  };

  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const photo = user.photo ? `${PHOTO_URL}${user.photo}` : false;

  return (
    <Row gutter={12} style={{ marginBottom: "15px" }}>
      <Col>
        <Avatar size={150} src={photo} icon={<UserOutlined />} />
      </Col>
      <Col>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {user.name}
        </Typography.Title>
        <Typography.Text>{user.email}</Typography.Text>
        <br />
        <Upload
          maxCount={1}
          customRequest={dummyRequest}
          beforeUpload={(file) => onSave(file)}
        >
          <Button type="dashed" className="rounded mt-5">
            Change Avatar
            <UploadOutlined />
          </Button>
        </Upload>
        <Logout />
      </Col>
    </Row>
  );
};

export default ProfileHeader;
