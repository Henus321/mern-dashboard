import { Navigate, Route, Routes } from "react-router-dom";
import { PREFIX } from "@/constants";

import { DashboardLayout, LoggedInRedirect, PrivateRoute } from "./";

import Orders from "@/pages/dashboard/orders";
import CreateOrder from "@/pages/dashboard/orders/create-order";
import EditOrder from "@/pages/dashboard/orders/edit-order";
import Products from "@/pages/dashboard/products";
import Customers from "@/pages/dashboard/customers";
import Login from "@/pages/login";
import Registration from "@/pages/registration";
import EditProfile from "@/pages/dashboard/profile/edit-profile";
import Portfolio from "@/pages/dashboard/profile/portfolio";
import Password from "@/pages/dashboard/profile/password";

export const AppRouter = () => {
  return (
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
          <Route path={`${PREFIX}/profile/portfolio`} element={<Portfolio />} />
          <Route path={`${PREFIX}/profile/password`} element={<Password />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
