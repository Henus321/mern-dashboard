import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../userSlice";
import { Button } from "antd";

const Logout = () => {
  const { isLoading } = useAppSelector((state) => state.user);

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
      Logout
    </Button>
  );
};

export default Logout;
