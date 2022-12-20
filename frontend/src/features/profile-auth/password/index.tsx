import React, { useEffect } from "react";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  ERROR_DURATION,
  MAX_40,
  PASSWORD_MATCH_MESSAGE,
} from "../../../constants";
import { reset } from "../profileAuthSlice";

import ProfileLayout from "../ProfileLayout";
import { IUser } from "../../../models";

const Password = () => {
  const { isSuccess, isError, message } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess || isError) {
      form.resetFields();
      console.log("Reset Fields");
    }
  }, [form, isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      dispatch(reset());
    }
  }, [dispatch, isError, message]);

  const onFinish = (values: IUser) => {
    if (values.password !== values.passwordConfirm) {
      notification.error({
        message: "Registration Error!",
        description: PASSWORD_MATCH_MESSAGE,
        duration: ERROR_DURATION,
      });
    } else {
      // dispatch(changePassword(values));
      console.log("Password Change");
    }
  };

  return (
    <ProfileLayout>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="current"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: "Please input your current password",
                },
                MAX_40,
              ]}
            >
              <Input.Password
                placeholder="Your current password"
                className="rounded"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password",
                },
                MAX_40,
              ]}
            >
              <Input.Password
                placeholder="Your new password"
                className="rounded"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="passwordConfirm"
              label="Password Confirm"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password",
                },
                MAX_40,
              ]}
            >
              <Input.Password
                placeholder="Confrim your new password"
                className="rounded"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col>
            <Button
              size="large"
              type="primary"
              className="rounded"
              htmlType="submit"
            >
              Save <SaveOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </ProfileLayout>
  );
};

export default Password;
