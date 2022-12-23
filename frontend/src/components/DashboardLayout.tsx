import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { Grid, Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import BreadcrumbMenu from "./BreadcrumbMenu";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const { xs } = useBreakpoint();

  return (
    <>
      <AppHeader />
      <Layout>
        <SideMenu />
        <Layout className={`${xs ? "py-12" : "py-24"}`}>
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
