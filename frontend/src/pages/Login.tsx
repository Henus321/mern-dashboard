import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login, reset } from "../features/auth/authSlice";
import { Form, Button, Input, Row, Col, Divider, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "test@yandex.ru",
    password: "123456",
  });

  const initialCredential = {
    email: "test@yandex.ru",
    password: "123456",
  };

  const { email, password } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      notification.open({
        message: "Notification Title",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        duration: 2,
      });
    }

    if (isSuccess || user) {
      // navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, dispatch, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    console.log("Logging in...");
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div>
      <div className="container container-500">
        <Row justify="center">
          <Col>
            <Divider>Login</Divider>
            <Form
              layout="vertical"
              name="login-form"
              initialValues={initialCredential}
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
                <Input onChange={onChange} prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
              >
                <Input.Password onChange={onChange} prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
