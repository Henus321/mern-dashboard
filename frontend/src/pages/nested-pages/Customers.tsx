import { Card } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import CustomersTable from "../../components/tables/CustomersTable";

const Customers = () => {
  const location = useLocation();
  const endOfPath = location.pathname.split("/").slice(-1)[0];

  return (
    <Card
      bodyStyle={{
        padding: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      className="rounded-card"
    >
      {endOfPath === "create-customer" ? <Outlet /> : <CustomersTable />}
    </Card>
  );
};

export default Customers;
