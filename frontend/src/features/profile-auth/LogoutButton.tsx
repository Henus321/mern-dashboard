import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "@/store/profile-auth/profileAuthSlice";

export const LogoutButton = () => {
  const { isLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

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
      Logout <LogoutOutlined />
    </Button>
  );
};
