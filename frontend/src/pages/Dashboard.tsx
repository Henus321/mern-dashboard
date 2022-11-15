import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
// import {
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import navigationConfig from "../configs/NavigationConfig";
import { Link, Outlet } from "react-router-dom";

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

  return (
    <>
      <AppHeader />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          ></Menu>
        </Sider>
        <Layout style={{ padding: "0 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
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
