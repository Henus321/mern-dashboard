import { Link, Outlet, useLocation } from "react-router-dom";
import { Row, Col, Divider, Typography } from "antd";
import AppFooter from "../components/AppFooter";

const Authorization = () => {
  const location = useLocation();

  const isRegistration = location.pathname === "/registration";

  return (
    <>
      <Row justify="center" className="m-auto">
        <Col className="colored-container">
          <Typography.Title level={1} className="flex justify-center">
            Mern Dashboard
          </Typography.Title>
          {isRegistration ? (
            <Divider style={{ fontSize: "24px" }}>Registration</Divider>
          ) : (
            <Divider style={{ fontSize: "24px" }}>Login</Divider>
          )}
          <Outlet />
          {isRegistration ? (
            <Typography.Paragraph>
              Already have an account?{" "}
              <Typography.Text underline>
                <Link to="/">Log in and get started!</Link>
              </Typography.Text>
            </Typography.Paragraph>
          ) : (
            <Typography.Paragraph>
              Don&rsquo;t have an account?{" "}
              <Typography.Text underline>
                <Link to="/registration">Sign up and get started!</Link>
              </Typography.Text>
            </Typography.Paragraph>
          )}
        </Col>
      </Row>
      <AppFooter />
    </>
  );
};

export default Authorization;
