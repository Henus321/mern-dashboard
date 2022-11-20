import React, { useState } from "react";
import { Button, Form, Table, Tag, Tooltip } from "antd";
import {
  EditOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { customers } from "../../dev-data/MockCutomers";
import { ICustomer } from "../../models/ICustomer";
import { v4 as uuid } from "uuid";

import EditableCell from "./EditableCell";

const CustomersTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(customers);
  const [editingKey, setEditingKey] = useState<string | number>("");

  // const navigate = useNavigate();

  const isEditing = (record: ICustomer) => record.key === editingKey;

  const onEdit = (record: Partial<ICustomer> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const onCancel = () => {
    setEditingKey("");
  };

  const onDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const onCreate = () => {
    const newCustomer: ICustomer = {
      key: uuid(),
      name: " ",
      phone: " ",
      email: " ",
      social: " ",
      city: " ",
    };
    setData((prevData) => [newCustomer, ...prevData]);
    onEdit(newCustomer);
  };

  const onSave = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ICustomer;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
      render: (link: string, record: ICustomer) => {
        const editable = isEditing(record);
        let color = "orange";
        let tag = "unknown";
        if (link.includes("facebook")) {
          color = "geekblue";
          tag = "facebook";
        }
        if (link.includes("instagram")) {
          color = "pink";
          tag = "instagram";
        }
        if (link.includes("vk")) {
          color = "blue";
          tag = "vk";
        }
        if (link.includes("linkedin")) {
          color = "green";
          tag = "linkedin";
        }
        return (
          !editable && (
            <Tooltip title={link}>
              <Tag color={color} key={link} className="m-3">
                <a href={link} target="_blank" rel="noreferrer">
                  {tag.toUpperCase()}
                </a>
              </Tag>
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
              onClick={() => onSave(record.key)}
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
                onDelete(record.key);
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
                onDelete(record.key);
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
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: onCancel,
        }}
      />
      <Button
        type="primary"
        size="large"
        className="rounded right-side-button"
        onClick={() => onCreate()}
      >
        Create New Customer
      </Button>
    </Form>
  );
};

export default CustomersTable;
