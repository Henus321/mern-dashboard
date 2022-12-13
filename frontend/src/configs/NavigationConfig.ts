import {
  UsergroupAddOutlined,
  CarryOutOutlined,
  IdcardOutlined,
  UserOutlined,
  CarOutlined,
  UserSwitchOutlined,
  FileOutlined,
} from "@ant-design/icons";

export const sideMenu = [
  {
    key: "orders",
    path: "/orders",
    title: "Orders",
    icon: IdcardOutlined,
    submenu: null,
  },
  {
    key: "products",
    path: "/products",
    title: "Products",
    icon: CarOutlined,
    submenu: null,
  },
  {
    key: "customers",
    path: "/customers",
    title: "Customers",
    icon: UsergroupAddOutlined,
    submenu: null,
  },
  {
    key: "notes",
    path: "/notes-1",
    title: "Notes",
    icon: CarryOutOutlined,
    submenu: [
      {
        key: "notes-1",
        path: "/notes-1",
        title: "Notes 1",
        icon: null,
      },
      {
        key: "notes-2",
        path: "/notes-2",
        title: "Notes 2",
        icon: null,
      },
    ],
  },
  {
    key: "profile",
    path: "/profile/edit-profile",
    title: "Profile",
    icon: UserOutlined,
    submenu: null,
  },
];

export const profileMenu = [
  {
    key: "edit-profile",
    path: "/profile/edit-profile",
    title: "Edit Profile",
    icon: UserSwitchOutlined,
    submenu: null,
  },
  {
    key: "portfolio",
    path: "/profile/portfolio",
    title: "Portfolio",
    icon: FileOutlined,
    submenu: null,
  },
];
