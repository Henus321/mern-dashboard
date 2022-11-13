import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login, reset } from "../features/auth/authSlice";
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Divider,
  notification,
  Typography,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import AppFooter from "../components/AppFooter";
import { IUser } from "../models/IUser";

const Login = () => {
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );

  const initialCredential: IUser = {
    email: "test@yandex.ru",
    password: "123456",
  };

  const [formData, setFormData] = useState<IUser>(initialCredential);

  const { email, password } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      notification.open({
        message: "Login Error!",
        description: message,
        duration: 2,
      });
    }

    if (isSuccess || user) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, dispatch, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    const userData: IUser = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <>
      <Row justify="center" className="margin-y-auto">
        <Col className="colored-container">
          <Typography.Title level={1} className="flex justify-center">
            Mern Dashboard
          </Typography.Title>
          <Divider style={{ fontSize: "24px" }}>Login</Divider>
          <Form
            initialValues={initialCredential}
            layout="vertical"
            name="login-form"
            onFinish={onSubmit}
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
            <Form.Item>
              <Button
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
            Don't have an account?
            <Typography.Text underline>
              {" "}
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
