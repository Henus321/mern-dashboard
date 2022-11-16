import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import navigationConfig from "../configs/NavigationConfig";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  breadcrumbRouteCreator,
  capitalizeFirstLetter,
} from "../helpers/Helpers";

const { Content, Sider } = Layout;

const Dashboard = () => {
  const menuItems: MenuProps["items"] = [...navigationConfig].map(
    (menuItem) => {
      return {
        key: menuItem.key,
        path: menuItem.path,
        label: menuItem.submenu ? (
          menuItem.title
        ) : (
          <Link to={menuItem.path}>{menuItem.title}</Link>
        ),
        icon: React.createElement(menuItem.icon),
        children: menuItem.submenu
          ? menuItem.submenu.map((menuSubItem) => {
              return {
                key: menuSubItem.key,
                path: menuSubItem.path,
                label: <Link to={menuSubItem.path}>{menuSubItem.title}</Link>,
                icon: menuSubItem.icon
                  ? React.createElement(menuSubItem.icon)
                  : null,
              };
            })
          : null,
      };
    }
  );

  const location = useLocation();
  const currentMenuItemKey = location.pathname.split("/").slice(2)[0];

  const breadcrumbItems: string[] = location.pathname
    .split("/")
    .filter((item) => item !== "");

  return (
    <>
      <AppHeader />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentMenuItemKey]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          ></Menu>
        </Sider>
        <Layout style={{ padding: "0 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={`${item}`}>
                {index > 0 ? (
                  <Link to={breadcrumbRouteCreator(breadcrumbItems, index)}>
                    {capitalizeFirstLetter(item)}
                  </Link>
                ) : (
                  capitalizeFirstLetter(item)
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content
            className="site-layout-background rounded"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <span>Default Content</span>
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
