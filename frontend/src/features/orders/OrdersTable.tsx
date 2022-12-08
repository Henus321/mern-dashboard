import React from "react";
import { Table, Button, Image } from "antd";
import { UsergroupAddOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrdersTable, IOrdersTableProps } from "../../models/IOrder";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { beautifyCost, capitalizeFirstLetter } from "../../helpers/helpers";

const OrdersTable: React.FC<IOrdersTableProps> = ({ orders }) => {
  const navigate = useNavigate();

  const columns: ColumnsType<IOrdersTable> = [
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
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Model",
      children: [
        {
          title: "Photo",
          dataIndex: "photoUrl",
          key: "photoUrl",
          width: "20%",
          render: (photo) => (
            <Image src={photo} alt="car" className="w-min-200" />
          ),
        },
        {
          title: "Brand",
          dataIndex: "brand",
          key: "brand",
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: "Model",
          dataIndex: "model",
          key: "model",
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: "Cost",
          dataIndex: "cost",
          key: "cost",
        },
      ],
    },
    {
      title: "Assembly",
      dataIndex: "assembly",
      key: "assembly",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Registration",
      dataIndex: "registration",
      key: "registration",
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      key: "delivery",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "8%",
      render: (_: any, record) => {
        return (
          <div className="flex align-center justify-end">
            <Button
              size="large"
              type="primary"
              ghost
              className="mr-2"
              onClick={() => navigate(`${record.id}`)}
            >
              Details {<EditOutlined />}
            </Button>
          </div>
        );
      },
    },
  ];

  const convertToDataSource = (ordersArray: IOrder[]): IOrdersTable[] =>
    ordersArray.map((order) => {
      return {
        key: order._id,
        customer: order.customer.name,
        photoUrl: order.product.photoUrl[0],
        brand: capitalizeFirstLetter(order.product.brand),
        model: order.product.model,
        number: order.number,
        id: order._id,
        assembly: capitalizeFirstLetter(order.assembly),
        manager: order.manager.name,
        payment: order.payment.join("/"),
        cost: beautifyCost(order.product.cost),
        registration: moment(order.registration).format("DD/MM/YYYY"),
        delivery: moment(order.delivery).format("DD/MM/YYYY"),
      };
    });

  return (
    <>
      <Table
        columns={columns}
        dataSource={convertToDataSource(orders)}
        pagination={{ pageSize: 5 }}
        bordered
      />
      <Button
        type="primary"
        size="large"
        className="rounded right-side-button"
        onClick={() => console.log("Create")}
      >
        Create New Order <UsergroupAddOutlined />
      </Button>
    </>
  );
};

export default OrdersTable;
