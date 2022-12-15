import React, { useEffect } from "react";
import { Card, notification, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOrder, reset } from "./ordersSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  EDIT_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../../constants/Notifications";
import { ORDERS_ROUTE, ORDER_NOT_FOUND } from "../../constants/Routes";

import EditProducts from "./EditProducts";
import EditSettings from "./EditSettings";
import Spinner from "../../components/Spinner";

const EditOrder = () => {
  const { order, isLoading, isError, isModified, message } = useAppSelector(
    (state) => state.orders
  );
  const { orderId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError && !order) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      navigate(ORDER_NOT_FOUND);
    }

    if (isError && order) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      dispatch(reset());
    }

    if (isModified) {
      notification.success({
        message: "Success!",
        description: EDIT_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      navigate(ORDERS_ROUTE);
      dispatch(reset());
    }

    return () => {
      if (isError) {
        dispatch(reset());
      }
    };
    // eslint-disable-next-line
  }, [dispatch, navigate, isModified, isError, message]);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrder(orderId));
    }
  }, [dispatch, orderId]);

  return (
    <>
      {isLoading && <Spinner />}
      {order && (
        <Card
          bodyStyle={{
            padding: "0",
          }}
          className="rounded-card"
        >
          <Typography.Title className="mt-15 text-center" level={2}>
            Edit the Order
          </Typography.Title>
          <EditProducts order={order} />
          <EditSettings order={order} />
        </Card>
      )}
    </>
  );
};

export default EditOrder;
