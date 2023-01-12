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
  const { customers, message, isError, isSuccess, isModified, isLoading } =
    useAppSelector((state) => state.customers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess || isError) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Error!",
        description: message,
        duration: ERROR_DURATION,
      });
    }

    if (isModified) {
      notification.success({
        message: "Success!",
        description: COMMON_SUCCESS_MESSAGE,
        duration: SUCCESS_DURATION,
      });
    }

    if (!isError) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, isError, isModified, message]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && customers && (
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
