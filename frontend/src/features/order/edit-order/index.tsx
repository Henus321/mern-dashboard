import React, { useEffect } from "react";
import { Card, notification, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchOrder, reset } from "../orderSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  EDIT_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
  ORDERS_ROUTE,
} from "../../../constants";

import EditProduct from "..//EditProduct";
import EditSettings from "..//EditSettings";
import NotFound from "../../../components/NotFound";
import Spinner from "../../../components/Spinner";

const EditOrder = () => {
  const { order, isLoading, isError, isSuccess, isModified, message } =
    useAppSelector((state) => state.order);
  const { orderId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId && !isSuccess) {
      dispatch(fetchOrder(orderId));
    }

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, orderId, isSuccess]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      if (order) dispatch(reset());
    }

    if (isModified) {
      notification.success({
        message: "Success!",
        description: EDIT_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      navigate(ORDERS_ROUTE);
    }

    return () => {
      if (isError && !order) {
        dispatch(reset());
      }
    };
  }, [dispatch, navigate, order, isModified, isError, message]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && isError && !order && <NotFound type="Order" />}
      {!isLoading && !isModified && !isError && order && (
        <Card
          bodyStyle={{
            padding: "0",
          }}
          className="rounded-card"
        >
          <Typography.Title className="mt-15 text-center" level={2}>
            Edit the Order
          </Typography.Title>
          <EditProduct order={order} />
          <EditSettings order={order} />
        </Card>
      )}
    </>
  );
};

export default EditOrder;
