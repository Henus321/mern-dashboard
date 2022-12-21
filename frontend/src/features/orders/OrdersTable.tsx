import React from "react";
import { Table, Button, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IOrder, IOrdersTable, IOrdersTableProps } from "../../models";
import { useNavigate } from "react-router-dom";
import { beautifyCost, capitalizeText } from "../../helpers";
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
          <div className="flex flex-column align-center justify-end">
            <Button
              size="large"
              type="primary"
              ghost
              className="rounded mr-2 w-full mb-5"
              onClick={() => onEdit(record.id)}
            >
              Edit <EditOutlined />
            </Button>
            <Button
              size="large"
              type="primary"
              ghost
              danger
              className="rounded mr-2 w-full"
              onClick={() => onDelete(record.id)}
            >
              Delete <DeleteOutlined />
            </Button>
          </div>
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
        photoUrl: item.product.photoUrl[0],
        brand: capitalizeText(item.product.brand),
        model: item.product.model,
        cost: item.product.cost,
      };
      const order = {
        key: item._id,
        id: item._id,
        number: index + 1,
        assembly: capitalizeText(item.assembly),
        payment: item.payment.map((pay) => capitalizeText(pay)).join("/"),
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
