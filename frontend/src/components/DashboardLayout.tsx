import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { AppHeader, AppFooter, SideMenu, BreadcrumbMenu } from "./";

const { Content } = Layout;

export const DashboardLayout = () => {
  return (
    <>
      <AppHeader />
      <Layout>
        <SideMenu />
        <Layout className="dashboard-container">
          <BreadcrumbMenu />
          <Content className="site-layout-background transparent flex flex-column">
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </>
  );
};
