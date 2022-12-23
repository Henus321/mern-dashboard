import React, { useEffect } from "react";
import { Row, Col, Card, Grid } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUser } from "./profileAuthSlice";

import ProfileMenu from "./ProfileMenu";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../../components/Spinner";

const { useBreakpoint } = Grid;

interface Props {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { xs, md } = useBreakpoint();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Card
      bodyStyle={{
        padding: "0",
        height: "100%",
      }}
      className="rounded-card"
      style={{ height: "100%" }}
    >
      {xs && (
        <Row className="w-full">
          <ProfileMenu />
        </Row>
      )}
      <Row className="h-full">
        {!xs && (
          <Col span={4}>
            <ProfileMenu />
          </Col>
        )}
        <Col
          span={xs ? 24 : 20}
          className={`${xs ? "p-15" : "p-25"} ${md ? "" : "h-min-60vh"}`}
        >
          {isLoading && <Spinner />}
          {!isLoading && user && (
            <>
              <ProfileHeader user={user} />
              {children}
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileLayout;
