import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { reset, logout } from "../features/auth/authSlice";
import { Avatar, Button, Col, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      notification.open({
        message: "Logout Error!",
        description: message,
        duration: 2,
      });
    }

    if (isSuccess && !user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, dispatch, navigate]);

  const onLogout = () => {
    dispatch(logout(""));
  };

  return (
    <Col className="flex align-center">
      <Avatar className="margin-right" icon={<UserOutlined />} />
      <Button onClick={onLogout} type="primary" className="rounded">
        Logout
      </Button>
    </Col>
  );
};

export default LogoutButton;
