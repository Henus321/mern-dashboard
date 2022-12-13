import { useEffect } from "react";
import { Card, notification, Typography } from "antd";
import {
  CREATE_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../../constants/Notifications";
import { reset } from "./ordersSlice";
import { useNavigate } from "react-router-dom";
import { ORDERS_ROUTE } from "../../constants/Routes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import OrderSettings from "./CreateSettings";
import OrderProducts from "./CreateProducts";

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
        description: CREATE_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      navigate(ORDERS_ROUTE);
      dispatch(reset());
    }
  }, [dispatch, navigate, isSuccess, isError, message]);

  return (
    <Card
      bodyStyle={{
        padding: "0",
      }}
      className="rounded-card"
    >
      <Typography.Title className="mt-15 text-center" level={2}>
        Create an Order
      </Typography.Title>
      <OrderProducts />
      <OrderSettings />
    </Card>
  );
};

export default CreateOrder;
