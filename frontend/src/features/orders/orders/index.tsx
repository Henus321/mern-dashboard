import React, { useEffect } from "react";
import { Card, Button, notification } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchOrders, reset } from "../ordersSlice";
import { useNavigate } from "react-router-dom";
import {
  CREATE_ORDER_ROUTE,
  ORDER_DELETE_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../../../constants";

import OrdersTable from "../OrdersTable";
import Spinner from "../../../components/Spinner";
import MobileReminder from "../../../components/MobileReminder";

const Orders = () => {
  const { orders, isLoading, isSuccess, isError, isModified, message } =
    useAppSelector((state) => state.orders);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isModified) {
      notification.success({
        message: "Success!",
        description: ORDER_DELETE_MESSAGE,
        duration: SUCCESS_DURATION,
      });
    }

    if (!isSuccess) {
      dispatch(fetchOrders());
    }

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isModified, isError]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }

    return () => {
      if (isError) {
        dispatch(reset());
      }
    };
  }, [dispatch, isError, message]);

  const onCreate = () => {
    navigate(CREATE_ORDER_ROUTE);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && orders && (
        <>
          <Card
            data-testid="orders-card"
            bodyStyle={{
              padding: "0",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            className="content-container rounded-card"
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
          <MobileReminder />
        </>
      )}
    </>
  );
};

export default Orders;
