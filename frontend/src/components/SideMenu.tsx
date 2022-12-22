import { Layout, Menu, MenuProps } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sideMenu, defaultOpenSideMenuKeys } from "../configs";
import { useLayoutInfo } from "../hooks/layout";

const { Sider } = Layout;

const SideMenu = () => {
  const { menuCollapsed } = useLayoutInfo();

  const menuItems: MenuProps["items"] = [...sideMenu].map((menuItem) => {
    return {
      key: menuItem.key,
      path: menuItem.path,
      label: <Link to={menuItem.path}>{menuItem.title}</Link>,
      icon: React.createElement(menuItem.icon),
    };
  });

  const location = useLocation();
  const currentMenuItemKey = location.pathname.split("/").slice(2)[0];

  return (
    <Sider collapsed={menuCollapsed} width={140}>
      <Menu
        mode="inline"
        defaultOpenKeys={defaultOpenSideMenuKeys}
        selectedKeys={[currentMenuItemKey]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems}
      ></Menu>
    </Sider>
  );
};

export default SideMenu;
