import { Layout, Typography, Col, Row } from "antd";
import LogoutButton from "./LogoutButton";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header flex align-center">
      <Row className="flex justify-between width-full">
        <Col className="flex align-center">
          <Typography.Title level={2} className="flex" style={{ margin: 0 }}>
            Mern Dashboard
          </Typography.Title>
        </Col>
        <LogoutButton />
      </Row>
    </Header>
  );
};

export default AppHeader;
