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
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { login, reset } from "../profileAuthSlice";
import { IUser } from "../../../models";
import { ERROR_DURATION, MAX_40 } from "../../../constants";

import AppFooter from "../../../components/AppFooter";

const Login = () => {
  const { isError, isLoading, message } = useAppSelector((state) => state.auth);

  const initialCredential: IUser = {
    email: "test@yandex.ru",
    password: "123456",
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Login Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      dispatch(reset());
    }
  }, [dispatch, isError, message]);

  const onFinish = (values: IUser) => {
    dispatch(login(values));
  };

  return (
    <>
      <Row justify="center" className="m-auto">
        <Col className="colored-container">
          <Typography.Title level={1} className="flex justify-center">
            Mern Dashboard
          </Typography.Title>
          <Divider style={{ fontSize: "24px" }}>Login</Divider>
          <Form
            initialValues={initialCredential}
            layout="vertical"
            name="login-form"
            onFinish={onFinish}
          >
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
            Don&rsquo;t have an account?{" "}
            <Typography.Text underline>
              <Link to="/registration">Sign up and get started!</Link>
            </Typography.Text>
          </Typography.Paragraph>
        </Col>
      </Row>
      <AppFooter />
    </>
  );
};

export default Login;
