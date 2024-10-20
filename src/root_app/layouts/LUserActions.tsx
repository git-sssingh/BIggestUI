import { Col, Grid, Layout, Row } from "antd";
import React from "react";
import {
  CBreadCrumb,
  CCopyRight,
  CFooter,
  CLogo,
  CNavbar,
  CSearchBox,
} from "../components";
import { Outlet } from "react-router-dom";
import LoginPageImage from "../assets/loginPage.jpg";
import CommunityImage from "../assets/community.svg";

const { Header, Footer, Sider, Content } = Layout;

const LUserActions = (): JSX.Element => {
  const screens = Grid.useBreakpoint();
  return (
    <Layout>
      <div className="logo-container ml-2 d-flex align-items-center justify-content-left">
        <CLogo />
      </div>
      <Content
        className="m-2"
        style={{
          minHeight: "50vh",
          background: "#fff",
          borderRadius: 6,
        }}
      >
        <Row>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img
              src={require("../assets/community.svg")}
              alt="mySvgImage"
              width="80%"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div
              className="bg-none w-100-per"
              style={{
                minHeight: screens.lg ? "90vh" : "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "none",
                // flexDirection: "column",
                padding: 24,
              }}
            >
              <Outlet />
            </div>
          </Col>
        </Row>
      </Content>
      <CCopyRight className="text-center mb-2" />
    </Layout>
  );
};

export default LUserActions;
