import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import BreadcrumbMenu from "../components/BreadcrumbMenu";

const { Content } = Layout;

const Dashboard = () => {
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
