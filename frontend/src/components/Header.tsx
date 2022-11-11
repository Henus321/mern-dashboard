import { PageHeader, Menu, MenuProps, Button, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items1: MenuProps["items"] = ["Home", "Login", "Registration"].map(
    (key) => ({
      key,
      label: `${key}`,
      onClick: () => navigate(`/${key === "Home" ? "" : key.toLowerCase()}`),
    })
  );

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Layout>
      <PageHeader title="Mern Dashboard" />
      <Menu theme="dark" mode="horizontal" items={items1} />
      {user && (
        <Button onClick={onLogout} type="primary">
          Logout
        </Button>
      )}
    </Layout>
  );
};

export default Header;
