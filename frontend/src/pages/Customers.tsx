import React from "react";
import { Card } from "antd";
import CustomersTable from "../components/tables/CustomersTable";

const Customers = () => {
  return (
    <>
      <Card
        bodyStyle={{
          padding: "0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        className="rounded-card"
      >
        <CustomersTable />
      </Card>
    </>
  );
};

export default Customers;
