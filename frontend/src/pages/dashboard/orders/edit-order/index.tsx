import { useEffect } from "react";
import { Card, notification, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchOrder, reset } from "@/store/orders/ordersSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  ORDER_EDIT_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
  ORDERS_ROUTE,
} from "@/constants";

import { OrderProduct, EditSettings } from "@/features/orders";
import { NotFound, Spinner } from "@/components";

const EditOrder = () => {
  const { order, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.orders
  );
  const { orderId } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrder(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
      if (order) dispatch(reset());
    }

    if (isSuccess) {
      notification.success({
        message: "Success!",
        description: ORDER_EDIT_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      navigate(ORDERS_ROUTE);
      dispatch(reset());
    }
  }, [dispatch, navigate, order, isError, isSuccess, message]);

  return (
    <>
      {isLoading && !order && <Spinner />}
      {!isLoading && !order && isError && <NotFound type="Order" />}
      {!isError && order && (
        <>
          <Card
            bodyStyle={{
              padding: "0",
            }}
            className="rounded-card"
          >
            <Typography.Title className="mt-15 text-center" level={2}>
              Edit the Order
            </Typography.Title>
            <OrderProduct order={order} />
            <EditSettings order={order} />
          </Card>
        </>
      )}
    </>
  );
};

export default EditOrder;
