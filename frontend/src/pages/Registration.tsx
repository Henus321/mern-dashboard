import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { register, reset } from "../features/auth/authSlice";
import { Form, Button, Input, Row, Col, Divider, notification } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
    console.log("Logging in after registration...");

    if (password !== password2) {
      notification.open({
        message: "Notification Title",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        duration: 2,
      });
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <div>
      <div className="container container-500">
        <Row justify="center">
          <Col>
            <Divider>Registration</Divider>
            <Form layout="vertical" name="login-form" onFinish={onSubmit}>
              <Form.Item
                name="form-name"
                label="Name"
                rules={[{ required: true, message: "Please input your name" }]}
              >
                <Input
                  name="name"
                  value={name}
                  onChange={onChange}
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="form-email"
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
                  name="email"
                  value={email}
                  onChange={onChange}
                  prefix={<MailOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="form-password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
              >
                <Input.Password
                  name="password"
                  value={password}
                  onChange={onChange}
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="form-password2"
                label="Confirm Password"
                rules={[
                  { required: true, message: "Please confirm your password" },
                ]}
              >
                <Input.Password
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  prefix={<LockOutlined />}
                />
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
