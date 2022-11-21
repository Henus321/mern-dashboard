import React, { useEffect, useState } from "react";
import { Button, Card, Form, Table, Tag, Tooltip } from "antd";
import {
  EditOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ICustomer } from "../../models/ICustomer";
// import { v4 as uuid } from "uuid";

import EditableCell from "../../components/EditableCell";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomer,
} from "./customersSlice";

const emptyCustomer: ICustomer = {
  name: "",
  phone: "",
  email: "",
  social: "",
  city: "",
  id: "default-id",
  key: "default-key",
};

const Customers: React.FC = () => {
  const { customers } = useAppSelector((state) => state.customers);
  const [render, setRender] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingKey, setEditingKey] = useState<string | number>("");
  const [form] = Form.useForm();
  const customersPlusEmptyCell: ICustomer[] = [emptyCustomer, ...customers];
  const tableDataSource = isCreating ? customersPlusEmptyCell : customers;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch, render]);

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
    setRender(!render);
  };

  const onCreate = () => {
    setIsCreating(true);
    form.setFieldsValue({ ...emptyCustomer });
    setEditingKey(emptyCustomer.key);
  };

  const onSave = async (record: ICustomer) => {
    const newData = { ...form.getFieldsValue(), id: record.id };
    if (isCreating) {
      dispatch(createCustomer(newData));
      setIsCreating(false);
    } else {
      dispatch(updateCustomer(newData));
    }
    setEditingKey("");
    setRender(!render);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      width: "15%",
      sorter: {
        compare: (a: ICustomer, b: ICustomer) => a.name.localeCompare(b.name),
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      editable: true,
      width: "20%",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      editable: true,
      width: "20%",
    },
    {
      title: "Social Network",
      dataIndex: "social",
      editable: true,
      width: "20%",
      render: (link: string | null, record: ICustomer) => {
        const editable = isEditing(record);
        let color = "orange";
        let tag = "unknown";
        if (link?.includes("facebook")) {
          color = "geekblue";
          tag = "facebook";
        }
        if (link?.includes("instagram")) {
          color = "pink";
          tag = "instagram";
        }
        if (link?.includes("vk")) {
          color = "blue";
          tag = "vk";
        }
        if (link?.includes("linkedin")) {
          color = "green";
          tag = "linkedin";
        }
        return (
          !editable && (
            <Tooltip title={link}>
              {link ? (
                <Tag color={color} key={link} className="m-3">
                  <a href={link} target="_blank" rel="noreferrer">
                    {tag.toUpperCase()}
                  </a>
                </Tag>
              ) : (
                <Tag color="#dbdbdb" key={link} className="m-3">
                  <span>NONE</span>
                </Tag>
              )}
            </Tooltip>
          )
        );
      },
    },
    {
      title: "City",
      dataIndex: "city",
      editable: true,
      width: "15%",
      // get filters programmar
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
        {
          text: "Sidney",
          value: "Sidney",
        },
      ],
      onFilter: (value: any, record: ICustomer) =>
        record.city.startsWith(value),
      filterSearch: true,
    },
    {
      title: "",
      dataIndex: "operation",
      width: "10%",
      render: (_: any, record: ICustomer) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="flex align-center justify-end">
            <Button
              type="primary"
              ghost
              className="mr-2"
              icon={<CheckSquareOutlined />}
              onClick={() => onSave(record)}
            />
            <Button
              danger
              className="mr-2"
              icon={<CloseSquareOutlined />}
              onClick={() => onCancel()}
            />
            <Button
              disabled
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete(record.id);
              }}
            />
          </div>
        ) : (
          <div className="flex align-center justify-end">
            <Button
              disabled={editingKey !== ""}
              type="primary"
              ghost
              className="mr-2"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
            <Button
              disabled
              danger
              className="mr-2"
              icon={<CloseSquareOutlined />}
              onClick={() => onEdit(record)}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete(record.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ICustomer) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={tableDataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: onCancel,
            }}
          />
        )}
        <Button
          disabled={isCreating}
          type="primary"
          size="large"
          className="rounded right-side-button"
          onClick={() => onCreate()}
        >
          Create New Customer
        </Button>
      </Form>
    </Card>
  );
};

export default Customers;
