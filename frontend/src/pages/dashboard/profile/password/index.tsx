import { useEffect } from "react";
import { Button, Col, Form, Grid, Input, notification, Row } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  COMMON_SUCCESS_MESSAGE,
  ERROR_DURATION,
  MAX_40,
  PASSWORD_MATCH_MESSAGE,
  SUCCESS_DURATION,
} from "@/constants";
import { IUser } from "@/models";
import { passwordChange, reset } from "@/store/profile-auth/profileAuthSlice";

import { ProfileLayout } from "@/features/profile-auth";

const { useBreakpoint } = Grid;

const Password = () => {
  const { isSuccess, isError, message } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const { xl } = useBreakpoint();
  const spanFull = xl ? 12 : 24;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess || isError) {
      form.resetFields();
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

    if (isSuccess) {
      notification.success({
        message: "Success!",
        description: COMMON_SUCCESS_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      dispatch(reset());
    }
  }, [dispatch, isError, isSuccess, message]);

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
        <Row>
          <Col span={spanFull}>
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
                size="large"
                placeholder="Your current password"
                className="rounded"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={spanFull}>
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
                size="large"
                placeholder="Your new password"
                className="rounded"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={spanFull}>
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
                size="large"
                placeholder="Confirm your new password"
                className="rounded"
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          size="large"
          type="primary"
          className="rounded"
          htmlType="submit"
        >
          Save <SaveOutlined />
        </Button>
      </Form>
    </ProfileLayout>
  );
};

export default Password;
