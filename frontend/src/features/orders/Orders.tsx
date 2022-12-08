import React, { useEffect } from "react";
import { Card, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOrders } from "./ordersSlice";
import { ERROR_DURATION } from "../../constants/Errors";

import OrdersTable from "./OrdersTable";
import Spinner from "../../components/Spinner";

const Orders: React.FC = () => {
  const { orders, isLoading, isError, message } = useAppSelector(
    (state) => state.orders
  );

  const dispatch = useAppDispatch();

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
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Card
      bodyStyle={{
        padding: "0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="rounded-card"
      style={{ height: "100%" }}
    >
      {isLoading && <Spinner />}
      {!isLoading && orders && <OrdersTable orders={orders} />}
    </Card>
  );
};

export default Orders;
