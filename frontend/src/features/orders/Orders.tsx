import React, { useEffect } from "react";
import { Card, notification, Button } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOrders } from "./ordersSlice";
import { ERROR_DURATION } from "../../constants/Errors";
import { useNavigate } from "react-router-dom";
import { CREATE_ORDER_ROUTE } from "../../constants/Routes";

import OrdersTable from "./OrdersTable";
import Spinner from "../../components/Spinner";

const Orders: React.FC = () => {
  const { orders, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.orders
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }
  }, [dispatch, isError, message]);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isSuccess]);

  const onCreate = () => {
    navigate(CREATE_ORDER_ROUTE);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
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
  );
};

export default Orders;
