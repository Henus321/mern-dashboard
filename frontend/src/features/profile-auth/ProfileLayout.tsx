import React, { useEffect } from "react";
import { Row, Col, Card, Grid } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUser } from "./profileAuthSlice";

import ProfileMenu from "./ProfileMenu";
import ProfileHeader from "./ProfileHeader";
import Spinner from "../../components/Spinner";
import MobileReminder from "../../components/MobileReminder";

const { useBreakpoint } = Grid;

interface Props {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { lg } = useBreakpoint();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      {lg ? (
        <Card
          bodyStyle={{
            padding: "0",
            height: "100%",
          }}
          className="rounded-card"
          style={{ height: "100%" }}
        >
          <Row className="h-full">
            <Col span={4}>
              <ProfileMenu />
            </Col>
            <Col span={20} className="p-25">
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
      ) : (
        <MobileReminder />
      )}
    </>
  );
};

export default ProfileLayout;
