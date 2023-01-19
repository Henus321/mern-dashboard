import { useEffect } from "react";
import { Card, notification, Typography } from "antd";
import { reset } from "../ordersSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  ORDERS_ROUTE,
  ERROR_DURATION,
  SUCCESS_DURATION,
  ORDER_CREATE_MESSAGE,
} from "../../../constants";

import CreateProduct from "../CreateProduct";
import CreateSettings from "../CreateSettings";

const CreateOrder = () => {
  const { isSuccess, isError, message } = useAppSelector(
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
      dispatch(reset());
    }

    if (isSuccess) {
      notification.success({
        message: "Success!",
        description: ORDER_CREATE_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      navigate(ORDERS_ROUTE);
      dispatch(reset());
    }
  }, [dispatch, navigate, isSuccess, isError, message]);

  return (
    <>
      <Card
        bodyStyle={{
          padding: "0",
        }}
        className="rounded-card"
      >
        <Typography.Title className="mt-15 text-center" level={2}>
          Create an Order
        </Typography.Title>
        <CreateProduct />
        <CreateSettings />
      </Card>
    </>
  );
};

export default CreateOrder;
