import React from "react";
import {
  Layout,
  Typography,
  Col,
  Row,
  Avatar,
  Dropdown,
  Space,
  Grid,
} from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  DingtalkOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PHOTO_URL } from "../constants";
import { profileMenu, sideMenu } from "../configs";
import { Link } from "react-router-dom";
import { logout } from "../features/profile-auth/profileAuthSlice";

const { useBreakpoint } = Grid;
const { Header } = Layout;

const AppHeader = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { sm, md } = useBreakpoint();

  const photo = user?.photo ? `${PHOTO_URL}${user.photo}` : undefined;

  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout(""));
  };

  const items: MenuProps["items"] = [
    ...(md ? profileMenu : sideMenu).map((item) => {
      return {
        key: `${item.key}-header`,
        label: <Link to={item.path}>{item.title}</Link>,
        icon: React.createElement(item.icon),
      };
    }),
    {
      key: "logout-header",
      label: <span onClick={onLogout}>Logout</span>,
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Header className={`header-container color-secondary flex align-center`}>
      <Row className="flex justify-between w-full">
        <Col className="flex align-center">
          <Space>
            <DingtalkOutlined
              style={{
                display: "block",
                fontSize: "36px",
              }}
            />
            <Typography.Title level={2} className="flex" style={{ margin: 0 }}>
              {sm ? "Mern Dashboard" : "MD"}
            </Typography.Title>
          </Space>
        </Col>
        {user && (
          <Col className="flex">
            <Dropdown
              placement="bottomRight"
              trigger={["click"]}
              menu={{ items }}
            >
              {md ? (
                <a
                  style={{ display: "block", height: "82%" }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <Avatar size="large" src={photo} icon={<UserOutlined />} />
                    <DownOutlined />
                  </Space>
                </a>
              ) : (
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <MenuOutlined style={{ fontSize: "30px" }} />
                </a>
              )}
            </Dropdown>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default AppHeader;
