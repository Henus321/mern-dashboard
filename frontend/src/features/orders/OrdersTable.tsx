import React from "react";
import { Table, Button, Image, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrdersTable } from "../../models";
import { Link, useNavigate } from "react-router-dom";
import { beautifyCost, convertOrdersToDataSource } from "../../utils";
import { brandFilters } from "../../configs";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteOrder } from "./ordersSlice";
import { EDIT_ORDER_ROUTE, PRODUCTS_ROUTE } from "../../constants";
import moment from "moment";

const OrdersTable = ({ orders }: { orders: IOrder[] }) => {
  const { isLoading } = useAppSelector((state) => state.orders);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onEdit = (id: string) => {
    navigate(`${EDIT_ORDER_ROUTE}/${id}`);
  };

  const onDelete = (id: string) => {
    dispatch(deleteOrder(id));
  };

  const columnsDesktop: ColumnsType<IOrdersTable> = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      width: "5%",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Product",
      children: [
        {
          title: "Photo",
          dataIndex: "photoUrl",
          key: "photoUrl",
          width: "20%",
          render: (photo) => (
            <Image src={photo} alt="car" className="w-min-100" />
          ),
        },
        {
          title: "Brand",
          dataIndex: "brand",
          key: "brand",
          filters: brandFilters,
          onFilter: (value: any, record) => record.brand.includes(value),
          render: (text: string) => (
            <Link
              data-testid={`${text.toLowerCase()}-link`}
              to={`${PRODUCTS_ROUTE}?brand=${text.toLowerCase()}`}
            >
              {text}
            </Link>
          ),
        },
        {
          title: "Model",
          dataIndex: "model",
          key: "model",
        },
        {
          title: "Cost",
          dataIndex: "cost",
          key: "cost",
          sorter: (a, b) => a.cost - b.cost,
          render: (cost: number) => <span>{beautifyCost(cost)}</span>,
        },
      ],
    },
    {
      title: "Build",
      dataIndex: "build",
      key: "build",
      responsive: ["xl"],
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      responsive: ["xl"],
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      key: "delivery",
      responsive: ["xl"],
      sorter: (a, b) =>
        moment(a.delivery, ["DD/MM/YYYY"]).unix() -
        moment(b.delivery, ["DD/MM/YYYY"]).unix(),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "8%",
      render: (_: any, record) => {
        return (
          <Space className="w-full" direction="vertical">
            <Button
              disabled={isLoading}
              type="primary"
              ghost
              className="rounded w-full px-4 py-10"
              onClick={() => onEdit(record.id)}
            >
              Edit <EditOutlined />
            </Button>
            <Button
              disabled={isLoading}
              data-testid="delete-button"
              type="primary"
              ghost
              danger
              className="rounded w-full px-4 py-10"
              onClick={() => onDelete(record.id)}
            >
              Delete <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  const columnsMobile: ColumnsType<IOrdersTable> = [
    {
      title: "Roster of Orders",
      dataIndex: "number",
      key: "list",
      sorter: (a, b) => a.number - b.number,
      render: (_, record) => (
        <Space direction="vertical">
          <Image
            preview={false}
            src={record.photoUrl}
            alt="car"
            className="w-min-100"
          />
          <span>
            <strong>Customer: </strong>
            {record.customer}
          </span>
          <span>
            <strong>Brand: </strong>
            <Link to={`${PRODUCTS_ROUTE}?brand=${record.brand.toLowerCase()}`}>
              {record.brand}
            </Link>
          </span>
          <span>
            <strong>Model: </strong>
            {record.model}
          </span>
          <span>
            <strong>Cost: </strong>
            {beautifyCost(record.cost)}
          </span>
          <Space direction="vertical" className="w-full">
            <Button
              disabled={isLoading}
              type="primary"
              ghost
              className="rounded w-full px-4 py-10"
              onClick={() => onEdit(record.id)}
            >
              Edit <EditOutlined />
            </Button>
            <Button
              disabled={isLoading}
              data-testid="delete-button"
              type="primary"
              ghost
              danger
              className="rounded w-full px-4 py-10"
              onClick={() => onDelete(record.id)}
            >
              Delete <DeleteOutlined />
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        className="table-desktop"
        columns={columnsDesktop}
        dataSource={convertOrdersToDataSource(orders)}
        pagination={{ pageSize: 5 }}
        bordered
      />
      <Table
        className="table-mobile"
        columns={columnsMobile}
        dataSource={convertOrdersToDataSource(orders)}
        pagination={{ pageSize: 3 }}
        bordered
      />
    </>
  );
};

export default OrdersTable;
