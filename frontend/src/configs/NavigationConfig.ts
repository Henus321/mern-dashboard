import {
  UsergroupAddOutlined,
  CarryOutOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";

const navSideMenu = [
  {
    key: "orders",
    path: "/dashboard/orders",
    title: "Orders",
    icon: IdcardOutlined,
    submenu: null,
  },
  {
    key: "customers",
    path: "/dashboard/customers",
    title: "Customers",
    icon: UsergroupAddOutlined,
    submenu: null,
  },
  {
    key: "notes",
    path: "/dashboard/notes-1",
    title: "Notes",
    icon: CarryOutOutlined,
    submenu: [
      {
        key: "notes-1",
        path: "/dashboard/notes-1",
        title: "Notes 1",
        icon: null,
      },
      {
        key: "notes-2",
        path: "/dashboard/notes-2",
        title: "Notes 2",
        icon: null,
      },
    ],
  },
  {
    key: "profile",
    path: "/dashboard/profile",
    title: "Profile",
    icon: UserOutlined,
    submenu: null,
  },
];

const navigationConfig = [...navSideMenu];

export default navigationConfig;
