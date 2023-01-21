import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PREFIX } from "../constants";

import DashboardLayout from "./DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import LoggedInRedirect from "./LoggedInRedirect";

import Orders from "../features/orders/orders";
import CreateOrder from "../features/orders/create-order";
import EditOrder from "../features/orders/edit-order";
import Products from "../features/products/products";
import Customers from "../features/customers/customers";
import Login from "../features/profile-auth/login";
import Registration from "../features/profile-auth/registration";
import EditProfile from "../features/profile-auth/edit-profile";
import Portfolio from "../features/profile-auth/portfolio";
import Password from "../features/profile-auth/password";

const AppRouter = () => {
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

export default AppRouter;
