import { Divider, Layout } from "antd";
import { CFooter, CNavbar } from "../components";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const LPortfolio = () => {
  return (
    <Layout>
      <CNavbar />
      <Content className="min-h-100 mt-8">
        <Outlet />
      </Content>
      <Divider style={{ margin: 0 }} />
      <CFooter />
    </Layout>
  );
};

export default LPortfolio;
