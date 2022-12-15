import { useState, useEffect } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { register, reset } from "./authSlice";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { IUser } from "../../models/auth";
import { ERROR_DURATION } from "../../constants/Notifications";
import { DEFAULT_AUTHORIZED_USER_ROUTE } from "../../constants/Routes";

import AppFooter from "../../components/AppFooter";

const Registration = () => {
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Registration Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }

    if (isSuccess && user) {
      navigate(DEFAULT_AUTHORIZED_USER_ROUTE);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    if (password !== passwordConfirm) {
      notification.error({
        message: "Registration Error!",
        description: "Passwords do not match...",
        duration: ERROR_DURATION,
      });
    } else {
      const userData: IUser = {
        name,
        email,
        password,
        passwordConfirm,
      };

      dispatch(register(userData));
    }
  };

  return (
    <>
      <Row justify="center" className="m-auto">
        <Col className="colored-container">
          <Typography.Title level={1} className="flex justify-center">
            Mern Dashboard
          </Typography.Title>

          <Divider style={{ fontSize: "24px" }}>Registration</Divider>
          <Form layout="vertical" name="login-form" onFinish={onSubmit}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name" }]}
            >
              <Input
                className="rounded"
                name="name"
                size="large"
                value={name}
                onChange={onChange}
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
              ]}
            >
              <Input
                className="rounded"
                name="email"
                size="large"
                value={email}
                onChange={onChange}
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password
                className="rounded"
                name="password"
                size="large"
                value={password}
                onChange={onChange}
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password" },
              ]}
            >
              <Input.Password
                className="rounded"
                name="passwordConfirm"
                size="large"
                value={passwordConfirm}
                onChange={onChange}
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
