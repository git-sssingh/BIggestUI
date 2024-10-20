import { Layout } from "antd";
import { CFooter, CNavbar } from "../components";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const LTeams = (): JSX.Element => {
  return (
    <Layout>
      <CNavbar />
      <Content>
        <div className="teams-layout-container">
          <Outlet />
        </div>
      </Content>
      <CFooter />
    </Layout>
  );
};

export default LTeams;
