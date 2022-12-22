import React from "react";
import { Grid, Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { profileMenu } from "../../configs";

const { useBreakpoint } = Grid;

const ProfileMenu = () => {
  const { lg } = useBreakpoint();
  const menuItems: MenuProps["items"] = [...profileMenu].map((menuItem) => {
    return {
      key: menuItem.key,
      path: menuItem.path,
      label: menuItem.submenu ? (
        menuItem.title
      ) : (
        <Link to={menuItem.path}>{menuItem.title}</Link>
      ),
      icon: React.createElement(menuItem.icon),
    };
  });

  const location = useLocation();
  const currentMenuItemKey = location.pathname.split("/").slice(3)[0];

  return (
    <Menu
      mode="inline"
      inlineCollapsed={!lg}
      defaultSelectedKeys={[currentMenuItemKey]}
      style={{
        height: "100%",
        borderRight: "1px solid rgba(0,0,0,0.07)",
      }}
      items={menuItems}
    />
  );
};

export default ProfileMenu;
