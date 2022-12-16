import React, { useEffect, useState } from "react";
import { Card, Form, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  fetchCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  reset,
} from "../customersSlice";
import { ICustomer } from "../../../models";
import { ERROR_DURATION, SUCCESS_DURATION } from "../../../constants";

import CustomersTable from "../CustomersTable";
import Spinner from "../../../components/Spinner";

const emptyCustomer: ICustomer = {
  name: "",
  phone: "",
  email: "",
  social: "",
  city: "",
  _id: "",
  key: "default-key",
};

const Customers = () => {
  const { customers, message, isError, isSuccess, isModified, isLoading } =
    useAppSelector((state) => state.customers);
  const [isCreating, setIsCreating] = useState(false);
  const [editingKey, setEditingKey] = useState<string | number>("");
  const [form] = Form.useForm();
  const customersPlusEmptyCell: ICustomer[] = [emptyCustomer, ...customers];
  const tableDataSource = isCreating ? customersPlusEmptyCell : customers;

  const dispatch = useAppDispatch();

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
        duration: SUCCESS_DURATION,
      });
    }

    dispatch(fetchCustomers());
  }, [dispatch, isError, isModified, message]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  const isEditing = (record: ICustomer) => record.key === editingKey;

  const onEdit = (record: Partial<ICustomer> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const onCancel = () => {
    setIsCreating(false);
    setEditingKey("");
  };

  const onDelete = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  const onCreate = () => {
    setIsCreating(true);
    form.setFieldsValue({ ...emptyCustomer });
    setEditingKey(emptyCustomer.key);
  };

  const onSave = (record: ICustomer) => {
    if (isCreating) {
      const newData = { ...form.getFieldsValue() };
      dispatch(createCustomer(newData));
      setIsCreating(false);
    } else {
      const newData = { ...form.getFieldsValue(), _id: record._id };
      dispatch(updateCustomer(newData));
    }
    setEditingKey("");
  };

  const handlers = {
    isEditing,
    onEdit,
    onCancel,
    onDelete,
    onCreate,
    onSave,
  };

  const tableData = {
    tableDataSource,
    editingKey,
    isCreating,
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {customers.length > 0 && (
        <Card
          bodyStyle={{
            padding: "0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
          className="rounded-card"
        >
          <Form form={form} component={false}>
            <CustomersTable handlers={handlers} tableData={tableData} />
          </Form>
        </Card>
      )}
    </>
  );
};

export default Customers;
