import React from "react";
import { Table, Button, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrdersTable, IOrdersTableProps } from "../../models";
import { useNavigate } from "react-router-dom";
import { beautifyCost, capitalizeText } from "../../utils";
import { brandFilters } from "../../configs";
import { useAppDispatch } from "../../hooks";
import { deleteOrder } from "./ordersSlice";
import { EDIT_ORDER_ROUTE } from "../../constants";
import { reset } from "../products/productsSlice";
import moment from "moment";

const OrdersTable: React.FC<IOrdersTableProps> = ({ orders }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onEdit = (id: string) => {
    navigate(`${EDIT_ORDER_ROUTE}/${id}`);
    dispatch(reset());
  };

  const onDelete = (id: string) => {
    dispatch(deleteOrder(id));
  };

  const columns: ColumnsType<IOrdersTable> = [
    {
      title: "#",
      dataIndex: "number",
      key: "number",
      width: "5%",
      responsive: ["md"],
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      responsive: ["md"],
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
          render: (text: string) => <a>{text}</a>,
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
      responsive: ["lg"],
      render: (_: any, record) => {
        return (
          <>
            <Button
              type="primary"
              ghost
              className="rounded p-orders-button w-full"
              onClick={() => onEdit(record.id)}
            >
              Edit <EditOutlined />
            </Button>
            <Button
              type="primary"
              ghost
              danger
              className="rounded p-orders-button mt-5 w-full"
              onClick={() => onDelete(record.id)}
            >
              Delete <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const convertToDataSource = (ordersArray: IOrder[]): IOrdersTable[] =>
    ordersArray.map((item, index) => {
      const customer = {
        customer: item.customer.name,
      };
      const product = {
        photoUrl: item.product.photoUrl,
        brand: capitalizeText(item.product.brand),
        model: item.product.model,
        cost: item.product.cost,
      };
      const order = {
        key: item._id,
        id: item._id,
        number: index + 1,
        build: capitalizeText(item.build),
        payment: item.payment.map((pay) => capitalizeText(pay)).join(" "),
        delivery: moment(item.delivery).format("DD/MM/YYYY"),
      };

      return {
        ...customer,
        ...product,
        ...order,
      };
    });

  return (
    <Table
      columns={columns}
      dataSource={convertToDataSource(orders)}
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default OrdersTable;
