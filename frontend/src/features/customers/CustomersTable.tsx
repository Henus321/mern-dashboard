import React from "react";
import { Button, Table, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ICustomer, ICustomerTable } from "../../models";

const CustomersTable: React.FC<ICustomerTable> = ({ customers }) => {
  const cityFilters = Array.from(
    new Set(customers.map((item) => item.city))
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
      render: (link: string | null) => {
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
          <Tooltip title={link}>
            {link && (
              <Tag color={color} key={link} className="m-3">
                <a href={link} target="_blank" rel="noreferrer">
                  {tag.toUpperCase()}
                </a>
              </Tag>
            )}
          </Tooltip>
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
        return (
          <>
            <Button
              type="primary"
              ghost
              className="rounded p-orders-button w-full"
              onClick={() => console.log(record)}
            >
              Edit <EditOutlined />
            </Button>
            <Button
              type="primary"
              ghost
              danger
              className="rounded p-orders-button mt-5 w-full"
              onClick={() => console.log(record)}
            >
              Delete <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={customers} bordered />;
};

export default CustomersTable;
