import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { login, reset } from "../userSlice";
import { Form, Button, Input, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { IUser } from "../../../models/IUser";
import { ERROR_DURATION } from "../../../constants/Notifications";
import { DEFAULT_AUTHORIZED_USER_ROUTE } from "../../../constants/Routes";

const Login = () => {
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.user
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
      notification.error({
        message: "Login Error!",
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
    const userData: IUser = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
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
        rules={[{ required: true, message: "Please input your password" }]}
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
  );
};

export default Login;
