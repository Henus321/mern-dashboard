import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../userSlice";
import { Button, notification } from "antd";

const Logout = () => {
  const { isError, isLoading, message } = useAppSelector((state) => state.user);

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
  }, [isError, message, dispatch, navigate]);

  const onLogout = () => {
    dispatch(logout(""));
  };

  return (
    <Button
      loading={isLoading}
      onClick={onLogout}
      type="dashed"
      danger
      className="rounded w-full mt-5"
    >
      Logout
    </Button>
  );
};

export default Logout;
