import { useEffect } from "react";
import {
  Form,
  Button,
  Input,
  notification,
  Row,
  Col,
  Divider,
  Typography,
  Space,
  Grid,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  DingtalkOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { register, reset } from "../profileAuthSlice";
import { IUser } from "../../../models";
import {
  ERROR_DURATION,
  MAX_40,
  PASSWORD_MATCH_MESSAGE,
} from "../../../constants";

import AppFooter from "../../../components/AppFooter";

const { useBreakpoint } = Grid;

const Registration = () => {
  const { isError, isLoading, message } = useAppSelector((state) => state.auth);

  const { xs } = useBreakpoint();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Registration Error!",
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
      dispatch(register(values));
    }
  };

  return (
    <>
      <Row justify="center" className="m-auto">
        <Col
          className={`${
            xs
              ? "my-15 mt-30"
              : "px-48 py-80 color-secondary shadow-medium rounded"
          }`}
        >
          <Space className="flex justify-center">
            <DingtalkOutlined
              style={{
                display: "block",
                fontSize: "36px",
              }}
            />
            <Typography.Title level={xs ? 2 : 1} style={{ margin: 0 }}>
              Mern Dashboard
            </Typography.Title>
          </Space>
          <Divider style={{ fontSize: "24px" }}>Registration</Divider>
          <Form layout="vertical" name="login-form" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input your name" },
                MAX_40,
              ]}
            >
              <Input
                className="rounded"
                name="name"
                size="large"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email" },
                {
                  type: "email",
                  message: "Please enter a validate email!",
                },
                MAX_40,
              ]}
            >
              <Input
                className="rounded"
                name="email"
                size="large"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password" },
                MAX_40,
              ]}
            >
              <Input.Password
                className="rounded"
                name="password"
                size="large"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password" },
                MAX_40,
              ]}
            >
              <Input.Password
                className="rounded"
                name="passwordConfirm"
                size="large"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={isLoading}
                className="rounded"
                size="large"
                type="primary"
                htmlType="submit"
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph>
            Already have an account?{" "}
            <Typography.Text underline>
              <Link to="/">Log in and get started!</Link>
            </Typography.Text>
          </Typography.Paragraph>
        </Col>
      </Row>
      <AppFooter />
    </>
  );
};

export default Registration;
