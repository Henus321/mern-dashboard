import { Layout } from "antd";

import AppRouter from "./components/AppRouter";
import CookieReminder from "./components/CookieReminder";

const App = () => {
  return (
    <Layout className="app-container">
      <AppRouter />
      <CookieReminder />
    </Layout>
  );
};

export default App;
