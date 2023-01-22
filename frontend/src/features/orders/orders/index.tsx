import React, { useEffect } from "react";
import { Card, Button, notification } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchOrders, reset } from "../ordersSlice";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  CREATE_ORDER_ROUTE,
  ERROR_DURATION,
  ORDER_DELETE_MESSAGE,
  SUCCESS_DURATION,
  BRANDS,
} from "../../../constants";

import OrdersTable from "../OrdersTable";
import Spinner from "../../../components/Spinner";

const Orders = () => {
  const { orders, isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.orders
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      dispatch(reset());
    }

    if (isSuccess) {
      notification.success({
        message: "Success!",
        description: ORDER_DELETE_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      dispatch(reset());
    }
  }, [dispatch, isSuccess, isError, message]);

  const onCreate = () => {
    const initialParams = { brand: BRANDS[0] };
    navigate({
      pathname: CREATE_ORDER_ROUTE,
      search: `?${createSearchParams(initialParams)}`,
    });
  };

  return (
    <>
      {isLoading && orders.length === 0 ? (
        <Spinner />
      ) : (
        <Card
          data-testid="orders-card"
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
            disabled={isLoading}
            type="primary"
            size="large"
            className="rounded align-self-end m-submit-button"
            onClick={onCreate}
          >
            Create Order <AppstoreAddOutlined />
          </Button>
        </Card>
      )}
    </>
  );
};

export default Orders;
