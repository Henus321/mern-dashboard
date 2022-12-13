import { Layout, Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sideMenu } from "../configs/NavigationConfig";

const { Sider } = Layout;

const SideMenu = () => {
  const menuItems: MenuProps["items"] = [...sideMenu].map((menuItem) => {
    return {
      key: menuItem.key,
      path: menuItem.path,
      label: menuItem.title,
      icon: React.createElement(menuItem.icon),
      children: menuItem.submenu.map((menuSubItem) => {
        return {
          key: menuSubItem.key,
          path: menuSubItem.path,
          label: <Link to={menuSubItem.path}>{menuSubItem.title}</Link>,
          icon: React.createElement(menuSubItem.icon),
        };
      }),
    };
  });

  const location = useLocation();
  const currentMenuItemKey = location.pathname.split("/").slice(1)[0];
  const defaultOpenKey = "menu";

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultOpenKeys={[defaultOpenKey]}
        defaultSelectedKeys={[currentMenuItemKey]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems}
      ></Menu>
    </Sider>
  );
};

export default SideMenu;
