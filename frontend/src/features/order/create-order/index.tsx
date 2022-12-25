import { useEffect } from "react";
import { Card, Grid, notification, Typography } from "antd";
import { reset } from "../orderSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  ORDERS_ROUTE,
  CREATE_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../../../constants";

import CreateProduct from "../CreateProduct";
import CreateSettings from "../CreateSettings";
import MobileReminder from "../../../components/MobileReminder";

const { useBreakpoint } = Grid;

const CreateOrder = () => {
  const { isSuccess, isError, message } = useAppSelector(
    (state) => state.order
  );

  const { lg } = useBreakpoint();

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
    }

    return () => {
      if (isSuccess || isError) {
        dispatch(reset());
      }
    };
  }, [dispatch, navigate, isSuccess, isError, message]);

  return (
    <>
      {lg ? (
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
      ) : (
        <MobileReminder />
      )}
    </>
  );
};

export default CreateOrder;
