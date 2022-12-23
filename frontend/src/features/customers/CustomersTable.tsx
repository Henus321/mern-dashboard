import React from "react";
import { Button, Grid, Space, Table, Tag, Tooltip, Typography } from "antd";
import {
  EditOutlined,
  CloseSquareOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { ICustomer, ICustomerTable } from "../../models";

import EditableCell from "./EditableCell";

const { useBreakpoint } = Grid;

const CustomersTable: React.FC<ICustomerTable> = ({ handlers, tableData }) => {
  const { isEditing, onEdit, onCancel, onDelete, onCreate, onSave } = handlers;
  const { tableDataSource, editingKey, isCreating } = tableData;

  const { xs, lg, xl } = useBreakpoint();

  const cityFilters = Array.from(
    new Set(tableDataSource.map((item) => item.city))
  ).map((city) => {
    return {
      text: city,
      value: city,
    };
  });

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
      filters: cityFilters,
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
        return (
          <div className="flex align-center justify-end">
            <Space direction={xl ? "horizontal" : "vertical"}>
              <Button
                disabled={editable && editingKey === ""}
                type="primary"
                ghost
                className={"rounded mr-8"}
                icon={editable ? <CheckSquareOutlined /> : <EditOutlined />}
                onClick={() => (editable ? onSave(record) : onEdit(record))}
              />
              <Button
                disabled={!editable}
                danger
                className="rounded mr-8"
                icon={<CloseSquareOutlined />}
                onClick={() => onCancel()}
              />
              <Button
                disabled={editable}
                danger
                className="rounded"
                icon={<DeleteOutlined />}
                onClick={() => {
                  onDelete(record._id);
                }}
              />
            </Space>
          </div>
        );
      },
    },
  ];

  const mobileColumns = columns.filter((column) => {
    const list = ["phone", "name"];
    if (!xs) list.push("email");
    return list.includes(column.dataIndex);
  });

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
    <>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={tableDataSource}
        columns={lg ? mergedColumns : mobileColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: onCancel,
        }}
      />
      {lg ? (
        <Button
          disabled={isCreating || !!editingKey}
          type="primary"
          size="large"
          className="rounded align-self-end m-submit-button"
          onClick={() => onCreate()}
        >
          Create New Customer <UserAddOutlined />
        </Button>
      ) : (
        <Typography.Paragraph className="text-center py-12">
          <strong>Reminder:</strong> visit desktop version of the site for full
          functionality
        </Typography.Paragraph>
      )}
    </>
  );
};

export default CustomersTable;
