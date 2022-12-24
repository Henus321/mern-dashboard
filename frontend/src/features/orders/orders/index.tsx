import React, { useEffect } from "react";
import { Card, Button, notification, Grid } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchOrders, reset } from "../ordersSlice";
import { useNavigate } from "react-router-dom";
import {
  CREATE_ORDER_ROUTE,
  DELETE_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../../../constants";

import OrdersTable from "../OrdersTable";
import Spinner from "../../../components/Spinner";
import MobileReminder from "../../../components/MobileReminder";

const { useBreakpoint } = Grid;

const Orders = () => {
  const { orders, isLoading, isSuccess, isError, isModified, message } =
    useAppSelector((state) => state.orders);
  const { lg } = useBreakpoint();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }

    if (isModified) {
      notification.success({
        message: "Success!",
        description: DELETE_MESSAGE,
        duration: SUCCESS_DURATION,
      });
    }

    if (!isError) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isError, isModified, message]);

  const onCreate = () => {
    navigate(CREATE_ORDER_ROUTE);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && orders && (
        <>
          {lg ? (
            <Card
              bodyStyle={{
                padding: "0",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              className="rounded-card"
            >
              <OrdersTable orders={orders} />
              <Button
                type="primary"
                size="large"
                className="rounded align-self-end m-submit-button"
                onClick={onCreate}
              >
                Create Order <AppstoreAddOutlined />
              </Button>
            </Card>
          ) : (
            <MobileReminder />
          )}
        </>
      )}
    </>
  );
};

export default Orders;
