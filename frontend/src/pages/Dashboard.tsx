import { useEffect } from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { Layout, notification } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { isRedirect } from "../features/user/userSlice";
import { DEFAULT_UNAUTHORIZED_USER_ROUTE } from "../constants/Routes";
import SideMenu from "../components/SideMenu";
import BreadcrumbMenu from "../components/BreadcrumbMenu";
import { ERROR_DURATION } from "../constants/Errors";

const { Content } = Layout;

const Dashboard = () => {
  const { redirect } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      notification.error({
        message: "Error!",
        description: "You are not logged in! Redirection...",
        duration: ERROR_DURATION,
      });
      navigate(DEFAULT_UNAUTHORIZED_USER_ROUTE);
    }

    dispatch(isRedirect(""));
    // eslint-disable-next-line
  }, [dispatch, redirect]);

  return (
    <>
      <AppHeader />
      <Layout>
        <SideMenu />
        <Layout style={{ padding: "0 24px" }}>
          <BreadcrumbMenu />
          <Content className="site-layout-background transparent">
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
