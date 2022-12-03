import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { reset, logout } from "../features/auth/authSlice";
import { Avatar, Button, Col, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { DEFAULT_UNAUTHORIZED_USER_ROUTE } from "../constants/Routes";

const LogoutButton = () => {
  const { user, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Logout Error!",
        description: message,
        duration: 2,
      });
    }

    if (isSuccess && !user) {
      navigate(DEFAULT_UNAUTHORIZED_USER_ROUTE);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onLogout = () => {
    dispatch(logout(""));
  };

  return (
    <Col className="flex align-center">
      <Avatar className="mr-12" icon={<UserOutlined />} />
      <Button
        loading={isLoading}
        onClick={onLogout}
        type="primary"
        className="rounded"
      >
        Logout
      </Button>
    </Col>
  );
};

export default LogoutButton;
