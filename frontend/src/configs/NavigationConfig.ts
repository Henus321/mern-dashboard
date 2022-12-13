import {
  UsergroupAddOutlined,
  CarryOutOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
  UserOutlined,
  CarOutlined,
  UserSwitchOutlined,
  FileOutlined,
} from "@ant-design/icons";

export const sideMenu = [
  {
    key: "menu",
    path: "/",
    title: "Menu",
    icon: UnorderedListOutlined,
    submenu: [
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
        path: "/notes",
        title: "Notes",
        type: "group",
        icon: CarryOutOutlined,
        submenu: null,
      },
      {
        key: "profile",
        path: "/profile/edit-profile",
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
