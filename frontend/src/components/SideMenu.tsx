import { Layout, Menu, MenuProps, Grid } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sideMenu, defaultOpenSideMenuKeys } from "../configs";

const { useBreakpoint } = Grid;
const { Sider } = Layout;

const SideMenu = () => {
  const { md, xl, xxl } = useBreakpoint();

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
    <>
      {md && (
        <Sider
          collapsed={!xl}
          width={!xxl ? 140 : 180}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            defaultOpenKeys={defaultOpenSideMenuKeys}
            selectedKeys={[currentMenuItemKey]}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          ></Menu>
        </Sider>
      )}
    </>
  );
};

export default SideMenu;
