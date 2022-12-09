import React from "react";
import { Table, Button, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrdersTable, IOrdersTableProps } from "../../models/IOrder";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { beautifyCost, capitalizeText } from "../../helpers/helpers";
import { brandFilters } from "../../configs/FiltersConfig";

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
      sorter: (a, b) => a.customer.localeCompare(b.customer),
      render: (text: string) => <a>{text}</a>,
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
            <Image src={photo} alt="car" className="w-min-200" />
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
          render: (text: string) => <a>{text}</a>,
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
      title: "Registration",
      dataIndex: "registration",
      key: "registration",
      sorter: (a, b) =>
        moment(a.registration).unix() - moment(b.registration).unix(),
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      key: "delivery",
      sorter: (a, b) => moment(a.delivery).unix() - moment(b.delivery).unix(),
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
    ordersArray.map((item) => {
      const customer = {
        customer: item.customer.name,
      };
      const product = {
        photoUrl: item.product.photoUrl[0],
        brand: capitalizeText(item.product.brand),
        model: item.product.model,
        cost: item.product.cost,
      };
      const order = {
        key: item._id,
        id: item._id,
        number: item.number,
        assembly: capitalizeText(item.assembly),
        payment: item.payment.join("/"),
        registration: moment(item.registration).format("DD/MM/YYYY"),
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
