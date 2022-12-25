import React from "react";
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { profileMenu } from "../../configs";

const ProfileMenu = () => {
  const menuItems: MenuProps["items"] = [...profileMenu].map((menuItem) => {
    return {
      key: menuItem.key,
      path: menuItem.path,
      label: <Link to={menuItem.path}>{menuItem.title}</Link>,
      icon: React.createElement(menuItem.icon),
    };
  });

  const location = useLocation();
  const currentMenuItemKey = location.pathname.split("/").slice(3)[0];

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={[currentMenuItemKey]}
        className="h-full"
        items={menuItems}
      />
    </>
  );
};

export default ProfileMenu;
