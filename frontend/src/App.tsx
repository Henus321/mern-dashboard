import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import Authorization from "./pages/Authorization";
import Dashboard from "./pages/Dashboard";
import Login from "./features/auth/Login";
import Registration from "./features/auth/Registration";
import Customers from "./features/customers/Customers";
import Orders from "./features/orders/Orders";
import Profile from "./features/profile/Profile";
import Notes2 from "./features/notes/Notes2";
import Notes1 from "./features/notes/Notes1";
import EditProfile from "./features/profile/EditProfile";
import Products from "./features/products/Products";

const App = () => {
  return (
    <Layout className="app-container">
      <Routes>
        <Route path="/" element={<Authorization />}>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route path="orders" element={<Orders />} />
          <Route path="products/" element={<Products />} />
          <Route path="customers/" element={<Customers />} />
          <Route path="notes-1" element={<Notes1 />} />
          <Route path="notes-2" element={<Notes2 />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
