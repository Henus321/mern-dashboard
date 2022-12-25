import React, { useEffect } from "react";
import { Button, Col, Form, Grid, Input, notification, Row } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  COMMON_SUCCESS_MESSAGE,
  ERROR_DURATION,
  MAX_40,
  PASSWORD_MATCH_MESSAGE,
  SUCCESS_DURATION,
} from "../../../constants";
import { IUser } from "../../../models";
import { passwordChange, reset } from "../profileAuthSlice";

import ProfileLayout from "../ProfileLayout";

const { useBreakpoint } = Grid;

const Password = () => {
  const { isModified, isError, message } = useAppSelector(
    (state) => state.auth
  );
  const [form] = Form.useForm();

  const { xl } = useBreakpoint();
  const full = xl ? 12 : 24;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isModified || isError) {
      form.resetFields();
    }
  }, [form, isModified, isError]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      dispatch(reset());
    }

    if (isModified) {
      notification.success({
        message: "Success!",
        description: COMMON_SUCCESS_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [dispatch, isError, isModified, message]);

  const onFinish = (values: Partial<IUser>) => {
    if (values.password !== values.passwordConfirm) {
      notification.error({
        message: "Registration Error!",
        description: PASSWORD_MATCH_MESSAGE,
        duration: ERROR_DURATION,
      });
    } else {
      dispatch(passwordChange(values));
    }
  };

  return (
    <ProfileLayout>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={full}>
          <Col span={full}>
            <Form.Item
              name="currentPassword"
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
        <Row gutter={full}>
          <Col span={full}>
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
        <Row gutter={full}>
          <Col span={full}>
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
        <Row gutter={full}>
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
