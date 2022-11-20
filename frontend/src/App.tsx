import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/nested-pages/Customers";
import Orders from "./pages/nested-pages/Orders";
import Profile from "./pages/nested-pages/Profile";
import Notes2 from "./pages/nested-pages/Notes2";
import Notes1 from "./pages/nested-pages/Notes1";
import EditProfile from "./pages/nested-pages/EditProfile";

const App = () => {
  return (
    <Layout className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route path="orders" element={<Orders />} />
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
