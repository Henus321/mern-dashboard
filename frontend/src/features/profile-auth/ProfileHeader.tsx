import React from "react";
import { Row, Col, Typography, Avatar, Button, Upload, Grid } from "antd";
import { RcFile } from "antd/lib/upload";
import { IProfileHeaderProps } from "../../models";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { PHOTO_URL } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { reset, updateUser } from "./profileAuthSlice";

import LogoutButton from "./LogoutButton";

const { useBreakpoint } = Grid;

const ProfileHeader: React.FC<IProfileHeaderProps> = ({ user }) => {
  const { xs } = useBreakpoint();
  const gutter = xs ? 24 : 12;

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

  const photo = user.photo ? `${PHOTO_URL}${user.photo}` : undefined;

  return (
    <Row gutter={gutter} className="mb-15">
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
          <Button type="dashed" className="rounded w-full mt-5">
            Change Avatar
            <UploadOutlined />
          </Button>
        </Upload>
        <LogoutButton />
      </Col>
    </Row>
  );
};

export default ProfileHeader;
