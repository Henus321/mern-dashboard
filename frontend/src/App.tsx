import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import { PREFIX } from "./constants/Routes";

import DashboardLayout from "./components/DashboardLayout";
import ProfileLayout from "./features/profile/ProfileLayout";
import PrivateRoute from "./components/PrivateRoute";
import LoggedInRedirect from "./components/LoggedInRedirect";

import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import Customers from "./features/customers/Customers";
import Orders from "./features/orders/Orders";
import Notes from "./features/notes/Notes";
import Products from "./features/products/Products";
import EditProfile from "./features/profile/EditProfile";
import Portfolio from "./features/profile/Portfolio";
import CreateOrder from "./features/orders/CreateOrder";
import EditOrder from "./features/orders/EditOrder";
import NotFound from "./components/NotFound";

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
            <Route path={`${PREFIX}/orders`} element={<Orders />} />
            <Route
              path={`${PREFIX}/orders/create-order`}
              element={<CreateOrder />}
            />
            <Route
              path={`${PREFIX}/orders/edit-order/:orderId`}
              element={<EditOrder />}
            />
            <Route path={`${PREFIX}/orders/not-found`} element={<NotFound />} />
            <Route path={`${PREFIX}/products`} element={<Products />} />
            <Route path={`${PREFIX}/customers`} element={<Customers />} />
            <Route path={`${PREFIX}/notes`} element={<Notes />} />
            <Route element={<ProfileLayout />}>
              <Route
                path={`${PREFIX}/profile/edit-profile`}
                element={<EditProfile />}
              />
              <Route
                path={`${PREFIX}/profile/portfolio`}
                element={<Portfolio />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
