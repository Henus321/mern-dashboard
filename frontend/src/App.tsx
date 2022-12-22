import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import { PREFIX } from "./constants";
import CookieConsent from "react-cookie-consent";

import DashboardLayout from "./components/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import LoggedInRedirect from "./components/LoggedInRedirect";

import Orders from "./features/orders/orders";
import CreateOrder from "./features/order/create-order";
import EditOrder from "./features/order/edit-order";
import Products from "./features/products/products";
import Customers from "./features/customers/customers";
import Login from "./features/profile-auth/login";
import Registration from "./features/profile-auth/registration";
import EditProfile from "./features/profile-auth/edit-profile";
import Portfolio from "./features/profile-auth/portfolio";
import Password from "./features/profile-auth/password";

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
            <Route path={`${PREFIX}/products`} element={<Products />} />
            <Route path={`${PREFIX}/customers`} element={<Customers />} />
            <Route
              path={`${PREFIX}/profile/edit-profile`}
              element={<EditProfile />}
            />
            <Route
              path={`${PREFIX}/profile/portfolio`}
              element={<Portfolio />}
            />
            <Route path={`${PREFIX}/profile/password`} element={<Password />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent
        location="bottom"
        expires={90}
        style={{
          backgroundColor: "rgba(0,0,0,0.75",
          padding: "0 50px",
          alignItems: "center",
        }}
        buttonStyle={{
          backgroundColor: "#1DA57A",
          color: "#fff",
          borderRadius: "5px",
          padding: "8px 16px",
        }}
        buttonText="Accept and close"
      >
        We use cookies to make your experience of our websites better. By using
        and further navigating this website you accept this.
      </CookieConsent>
    </Layout>
  );
};

export default App;
