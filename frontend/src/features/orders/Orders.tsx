import React, { useEffect } from "react";
import { Card, Button, notification } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOrders, reset } from "./ordersSlice";
import { useNavigate } from "react-router-dom";
import { CREATE_ORDER_ROUTE } from "../../constants/Routes";
import {
  DELETE_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../../constants/Notifications";

import OrdersTable from "./OrdersTable";
import Spinner from "../../components/Spinner";

const Orders: React.FC = () => {
  const { orders, isLoading, isSuccess, isError, isModified, message } =
    useAppSelector((state) => state.orders);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

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

    dispatch(fetchOrders());
  }, [dispatch, isError, isModified, message]);

  const onCreate = () => {
    navigate(CREATE_ORDER_ROUTE);
    dispatch(reset());
  };

  return (
    <>
      {isLoading && <Spinner />}
      {orders && (
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
            className="rounded right-side-button"
            onClick={onCreate}
          >
            Create New Order <UsergroupAddOutlined />
          </Button>
        </Card>
      )}
    </>
  );
};

export default Orders;
