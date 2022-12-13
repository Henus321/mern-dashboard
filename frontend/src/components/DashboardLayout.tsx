import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import BreadcrumbMenu from "./BreadcrumbMenu";

const { Content } = Layout;

const DashboardLayout = () => {
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

export default DashboardLayout;
