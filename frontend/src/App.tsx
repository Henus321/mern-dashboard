import { Layout } from "antd";

import { ScrollToTop, CookieReminder, AppRouter } from "@/components";

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
