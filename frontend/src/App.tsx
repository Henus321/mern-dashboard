import { Layout } from "antd";

import ScrollToTop from "./components/ScrollToTop";
import AppRouter from "./components/AppRouter";
import CookieReminder from "./components/CookieReminder";

const App = () => {
  return (
    <Layout className="app-container">
      <ScrollToTop />
      <AppRouter />
      <CookieReminder />
    </Layout>
  );
};

export default App;
