import React, { useEffect } from "react";
import { Card, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchCustomers, reset } from "../customersSlice";
import {
  COMMON_SUCCESS_MESSAGE,
  ERROR_DURATION,
  SUCCESS_DURATION,
} from "../../../constants";

import CustomersTable from "../CustomersTable";
import CustomersModal from "../CustomersModal";
import Spinner from "../../../components/Spinner";

const Customers = () => {
  const { customers, message, isError, isSuccess, isLoading } = useAppSelector(
    (state) => state.customers
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
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
        description: COMMON_SUCCESS_MESSAGE,
        duration: SUCCESS_DURATION,
      });
      dispatch(reset());
    }
  }, [dispatch, isError, isSuccess, message]);

  return (
    <>
      {isLoading && customers.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Card
            data-testid="customers-card"
            bodyStyle={{
              padding: "0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
            className="rounded-card"
          >
            <CustomersTable />
            <CustomersModal />
          </Card>
        </>
      )}
    </>
  );
};

export default Customers;
