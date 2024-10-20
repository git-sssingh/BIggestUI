import { Layout } from "antd";
import { CFooter, CNavbar } from "../components";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const LAskQuestion = (): JSX.Element => {
  return (
    <Layout>
      <CNavbar />
      <Content>
        <div className="ask-layout-container">
          <Outlet />
        </div>
      </Content>
      <CFooter />
    </Layout>
  );
};

export default LAskQuestion;
