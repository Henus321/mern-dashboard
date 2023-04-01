import React, { useEffect } from "react";
import { Row, Col, Card, Grid } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchUser } from "@/store/profile-auth/profileAuthSlice";

import { ProfileMenu, ProfileHeader } from "./";
import { Spinner } from "@/components";

const { useBreakpoint } = Grid;

interface Props {
  children: React.ReactNode;
}

export const ProfileLayout: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const { xs, lg } = useBreakpoint();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Card
        data-testid="profile-card"
        bodyStyle={{
          padding: "0",
          height: "100%",
        }}
        className="rounded-card"
        style={{ height: "100%" }}
      >
        {!lg && (
          <Row className="w-full">
            <ProfileMenu />
          </Row>
        )}
        <Row className="h-full">
          {lg && (
            <Col span={4}>
              <ProfileMenu />
            </Col>
          )}
          <Col
            span={lg ? 20 : 24}
            className={`${xs ? "p-15" : "p-25"} h-min-60vh`}
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
    </>
  );
};
