import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import ProfileLayout from "./features/profile/ProfileLayout";
import PrivateRoute from "./components/PrivateRoute";
import LoggedInRedirect from "./components/LoggedInRedirect";

import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import Customers from "./features/customers/Customers";
import Orders from "./features/orders/Orders";
import Notes2 from "./features/notes/Notes2";
import Notes1 from "./features/notes/Notes1";
import Products from "./features/products/Products";
import EditProfile from "./features/profile/EditProfile";
import Portfolio from "./features/profile/Portfolio";
import CreateOrder from "./features/orders/CreateOrder";
import EditOrder from "./features/orders/EditOrder";

const App = () => {
  return (
    <Layout className="app-container">
      <Routes>
        <Route element={<LoggedInRedirect />}>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/create-order" element={<CreateOrder />} />
            <Route path="/orders/edit-order/:orderId" element={<EditOrder />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/notes-1" element={<Notes1 />} />
            <Route path="/notes-2" element={<Notes2 />} />
            <Route element={<ProfileLayout />}>
              <Route path="profile/edit-profile" element={<EditProfile />} />
              <Route path="profile/portfolio" element={<Portfolio />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
