import {
  UsergroupAddOutlined,
  CarryOutOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  UserOutlined,
  CarOutlined,
  UserSwitchOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { PREFIX } from "../constants/Routes";

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
        key: "notes",
        path: `${PREFIX}/notes`,
        title: "Notes",
        type: "group",
        icon: CarryOutOutlined,
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
    icon: FileOutlined,
    submenu: null,
  },
];
