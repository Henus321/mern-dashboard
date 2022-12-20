import {
  UsergroupAddOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  UserOutlined,
  CarOutlined,
  UserSwitchOutlined,
  IdcardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { PREFIX } from "../constants";

export const defaultOpenSideMenuKeys = ["dashboard"];

export const sideMenu = [
  {
    key: "dashboard",
    path: `${PREFIX}`,
    title: "Dashboard",
    icon: UnorderedListOutlined,
    submenu: [
      {
        key: "orders",
        path: `${PREFIX}/orders`,
        title: "Orders",
        icon: AppstoreOutlined,
        submenu: null,
      },
      {
        key: "products",
        path: `${PREFIX}/products`,
        title: "Products",
        icon: CarOutlined,
        submenu: null,
      },
      {
        key: "customers",
        path: `${PREFIX}/customers`,
        title: "Customers",
        icon: UsergroupAddOutlined,
        submenu: null,
      },
      {
        key: "profile",
        path: `${PREFIX}/profile/edit-profile`,
        title: "Profile",
        icon: UserOutlined,
        submenu: null,
      },
    ],
  },
];

export const profileMenu = [
  {
    key: "edit-profile",
    path: `${PREFIX}/profile/edit-profile`,
    title: "Edit Profile",
    icon: UserSwitchOutlined,
    submenu: null,
  },
  {
    key: "portfolio",
    path: `${PREFIX}/profile/portfolio`,
    title: "Portfolio",
    icon: IdcardOutlined,
    submenu: null,
  },
  {
    key: "password",
    path: `${PREFIX}/profile/password`,
    title: "Password",
    icon: LockOutlined,
    submenu: null,
  },
];
