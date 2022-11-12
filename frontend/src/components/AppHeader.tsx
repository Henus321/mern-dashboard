import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import { reset, logout } from "../features/auth/authSlice";
import { Layout, Typography, Button, Col, Row, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Header className="header flex align-center">
      <Row className="flex justify-between width-full">
        <Col className="flex align-center">
          <Typography.Title level={2} className="flex" style={{ margin: 0 }}>
            Mern Dashboard
          </Typography.Title>
        </Col>
        {user && (
          <Col className="flex align-center">
            <Avatar className="margin-right" icon={<UserOutlined />} />
            <Button onClick={onLogout} type="primary" className="rounded">
              Logout
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default AppHeader;
