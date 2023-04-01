import { Button, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ICustomer } from "@/models";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteCustomer, setCustomer } from "@/store/customers/customersSlice";
import { createCityFilters } from "@/utils";

import { SocialNetworkTag } from "@/components";

export const CustomersTable = () => {
  const { customers, isLoading } = useAppSelector((state) => state.customers);

  const dispatch = useAppDispatch();

  const onDelete = (record: ICustomer) => dispatch(deleteCustomer(record._id));

  const onEdit = (record: ICustomer) => dispatch(setCustomer(record));

  const columnsDesktop = [
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
      render: (_: any, record: ICustomer) => (
        <SocialNetworkTag record={record} />
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      editable: true,
      width: "15%",
      filters: createCityFilters(customers),
      onFilter: (value: any, record: ICustomer) =>
        record.city.startsWith(value),
      filterSearch: true,
    },
    {
      title: "",
      dataIndex: "operation",
      width: "10%",
      render: (_: any, record: ICustomer) => {
        return (
          <Space className="w-full" direction="vertical">
            <Button
              disabled={isLoading}
              type="primary"
              ghost
              className="rounded w-full px-4 py-10"
              onClick={() => onEdit(record)}
            >
              Edit <EditOutlined />
            </Button>
            <Button
              disabled={isLoading}
              type="primary"
              ghost
              danger
              className="rounded w-full px-4 py-10"
              onClick={() => onDelete(record)}
            >
              Delete <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  const columnsMobile = [
    {
      title: "List of Customers",
      dataIndex: "name",
      editable: true,
      width: "100%",
      sorter: {
        compare: (a: ICustomer, b: ICustomer) => a.name.localeCompare(b.name),
      },
      render: (_: any, record: ICustomer) => (
        <Space direction="vertical" className="w-full">
          <span>
            <strong>Name: </strong>
            {record.name}
          </span>
          <span>
            <strong>Phone: </strong>
            {record.phone}
          </span>
          <span>
            <strong>E-mail: </strong>
            {record.email}
          </span>
          <span>
            <strong>Social Network: </strong>
            <SocialNetworkTag record={record} />
          </span>
          <span>
            <strong>City: </strong>
            {record.city}
          </span>
          <Button
            disabled={isLoading}
            type="primary"
            ghost
            className="rounded w-full px-4 py-10"
            onClick={() => onEdit(record)}
          >
            Edit <EditOutlined />
          </Button>
          <Button
            disabled={isLoading}
            type="primary"
            ghost
            danger
            className="rounded w-full px-4 py-10"
            onClick={() => onDelete(record)}
          >
            Delete <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        className="table-desktop"
        columns={columnsDesktop}
        dataSource={customers}
        bordered
      />
      <Table
        className="table-mobile"
        pagination={{ pageSize: 5 }}
        columns={columnsMobile}
        dataSource={customers}
        bordered
      />
    </>
  );
};
