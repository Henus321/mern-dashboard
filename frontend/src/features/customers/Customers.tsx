import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Card, Form, notification } from "antd";

import {
  fetchCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  reset,
} from "./customersSlice";
import { ICustomer } from "../../models/ICustomer";
import CustomersTable from "./CustomersTable";
import Spinner from "../../components/Spinner";

const emptyCustomer: ICustomer = {
  name: "",
  phone: "",
  email: "",
  social: "",
  city: "",
  id: "",
  key: "default-key",
};

const Customers: React.FC = () => {
  const { customers, message, isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.customers
  );
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
        duration: 2,
      });
    }
  }, [dispatch, isError, message]);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchCustomers());
    }
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
    dispatch(reset());
  };

  const onCreate = () => {
    setIsCreating(true);
    form.setFieldsValue({ ...emptyCustomer });
    setEditingKey(emptyCustomer.key);
  };

  const onSave = (record: ICustomer) => {
    const newData = { ...form.getFieldsValue(), id: record.id };
    if (isCreating) {
      dispatch(createCustomer(newData));
      setIsCreating(false);
    } else {
      dispatch(updateCustomer(newData));
    }
    setEditingKey("");
    dispatch(reset());
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
        {customers.length > 0 && (
          <CustomersTable handlers={handlers} tableData={tableData} />
        )}
      </Form>
    </Card>
  );
};

export default Customers;
