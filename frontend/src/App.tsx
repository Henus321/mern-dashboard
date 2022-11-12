import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

const App = () => {
  return (
    <Layout className="app-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Layout>
  );
};

export default App;
