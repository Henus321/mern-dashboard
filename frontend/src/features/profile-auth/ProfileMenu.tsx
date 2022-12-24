import React from "react";
import { Grid, Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { profileMenu } from "../../configs";

const { useBreakpoint } = Grid;

const ProfileMenu = () => {
  const { xs, lg } = useBreakpoint();

  const menuItems: MenuProps["items"] = [...profileMenu].map((menuItem) => {
    return {
      key: menuItem.key,
      path: menuItem.path,
      label: menuItem.submenu ? (
        menuItem.title
      ) : (
        <Link to={menuItem.path}>
          {xs
            ? React.createElement(menuItem.icon, {
                style: { fontSize: "24px", padding: "10px" },
              })
            : menuItem.title}
        </Link>
      ),
      icon: xs ? null : React.createElement(menuItem.icon),
    };
  });

  const location = useLocation();
  const currentMenuItemKey = location.pathname.split("/").slice(3)[0];

  return (
    <>
      {xs ? (
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[currentMenuItemKey]}
          className={`h-full ${xs ? "w-full justify-center" : ""}`}
          items={menuItems}
        />
      ) : (
        <Menu
          inlineCollapsed={!lg}
          mode="inline"
          defaultSelectedKeys={[currentMenuItemKey]}
          className={`h-full`}
          items={menuItems}
        />
      )}
    </>
  );
};

export default ProfileMenu;
