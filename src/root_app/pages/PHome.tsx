import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Grid } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  ROUTES,
  SUBSCRIPTION_CARD_AFTER_CLASS,
  SUBSCRIPTION_CARDS_COLORS,
} from "../constants";
import { CButton, CItalicText, CSubscriptionCard } from "../components";
import HomePageBannerImage from "../assets/new-banner-image.svg";
import InnovationImage from "../assets/Innovation.svg";
import DynamicTeamImage from "../assets/dynamic-team.svg";
import RealTimeImage from "../assets/Real-time.svg";
import CollabrativeImage from "../assets/collaboration.svg";
import PerformanceInsightImage from "../assets/Performance.svg";
import PotentialImage from "../assets/team-potential.svg";
import ProblemSolvingImage from "../assets/Problem solving.svg";
import DatabaseImage from "../assets/database.svg";
import ThinkingManGif from "../assets/Man thinking.gif";
import DiscussionGif from "../assets/Discussion.gif";
import SharingArticlesGif from "../assets/Sharing articles.gif";
import { ISubscription } from "../interfaces/subscription";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { getSubscriptions } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { scrollToSection } from "../utilities";
import PContactUs from "./PContactUs";
import PFAQs from "./PFAQs";
import { set } from "../redux/slices/subscriptionsSlice";
import { useSelector } from "react-redux";

const PHome = () => {
  const controller = new AbortController();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const { subscriptions } = useSelector(
    (state: RootState) => state.subscriptions
  );
  const { state } = useLocation();

  useEffect(() => {
    if (state?.page) {
      scrollToSection(state?.page || "home");
    }
  }, [state]);

  return (
    <React.Fragment>
      <div>
        <div
          id="home"
          className="relative  min-w-100 d-flex flex-column justify-content-center  align-items-center  home-page-banner-image-container"
        >
          <Typography.Title
            level={1}
            className="banner-heading text-center mt-4"
          >
            Empowering Teams, Fostering Knowledge Sharing <br /> & Igniting
            Innovation Through Collaboration
          </Typography.Title>

          <CItalicText
            className="d-block color-white text-center"
            children={
              <React.Fragment>
                In today's fast-paced business environment, collaboration and
                knowledge sharing are paramount to success. <br /> We understand
                the challenges companies face in harnessing the collective
                intelligence of their workforce. <br /> That's why we created
                Yaksha Prashna, a dynamic platform designed to empower teams and
                facilitate seamless knowledge exchange.
              </React.Fragment>
            }
          />

          <CButton
            text="Create Your Knowledge Bank"
            type="primary"
            onClick={() =>
              navigate(ROUTES.home, {
                state: { page: "pricing" },
              })
            }
            className="p-12 mt-4 getting-started-button"
          />
          <Row
            gutter={[16, 16]}
            className="w-100-per mt-4 mb-4 d-flex justify-content-center align-items-center"
          >
            <Col
              xs={24}
              sm={24}
              md={7}
              className="d-flex justify-content-center align-items-center"
            >
              {" "}
              <img
                src={ThinkingManGif}
                alt="Think Man"
                className="banner-image"
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={7}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={SharingArticlesGif}
                alt="Sharing Articles"
                className="banner-image"
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={7}
              className="d-flex justify-content-center align-items-center"
            >
              {" "}
              <img
                src={DiscussionGif}
                alt="Discussion"
                className="banner-image"
              />
            </Col>
          </Row>
          <div className="custom-shape-divider-bottom-1727866649">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
        <div
          id="aboutus"
          className="relative min-w-100 d-flex flex-column about-us-container"
        >
          <Typography.Title level={2} className="text-center section-heading">
            Igniting Innovation Through Collaboration
          </Typography.Title>
          <CItalicText
            className="text-center mt-1"
            children={
              <React.Fragment>
                In today's rapidly evolving business landscape, success hinges
                on the ability to harness collective intelligence and foster a
                culture of continuous learning. That's where Yaksha Prashna
                comes in. We're not just a platform; we're a catalyst for
                innovation, empowering teams to collaborate, share knowledge,
                and achieve extraordinary results. Our vision is to transform
                the way companies collaborate and solve problems. We believe
                that by creating a space where employees can connect, share
                ideas, and learn from each other, we can drive innovation and
                boost productivity. Yaksha Prashna is more than just a platform;
                it's a catalyst for growth and development. This is how we do
                it.
              </React.Fragment>
            }
          />
          <div className="d-flex justify-content-center mt-4 about-us-description-container">
            <div className="about-us-description-left-container">
              <div className="about-us-card">
                <img
                  src={DynamicTeamImage}
                  className="about-us-card-image"
                  alt="Dynamic Team"
                />
                <Typography.Title level={5} className="m-0">
                  Dynamic Teams
                </Typography.Title>
                <CItalicText
                  className="text-right"
                  children={
                    <React.Fragment>
                      Create and join teams based on projects, interests, or
                      departments. It's your community of experts.
                    </React.Fragment>
                  }
                />
              </div>
              <div className="about-us-card mt-4">
                <img
                  src={RealTimeImage}
                  className="about-us-card-image"
                  alt="Real time Q&A"
                />
                <Typography.Title level={5} className="m-0">
                  Real-time Q&A
                </Typography.Title>
                <CItalicText
                  className="text-right"
                  children={
                    <React.Fragment>
                      Got a question? Ask away! Get quick answers from your
                      team, earn points for insightful replies, and watch your
                      knowledge grow.
                    </React.Fragment>
                  }
                />
              </div>
            </div>
            <img
              src={InnovationImage}
              alt="Innovation Image"
              className="innovation-image banner-image"
            />
            <div className="about-us-description-right-container">
              <div className="about-us-card align-items-flex-start">
                <img
                  src={CollabrativeImage}
                  className="about-us-card-image"
                  alt="Collaboration"
                />
                <Typography.Title level={5} className="m-0">
                  Collaborative Articles
                </Typography.Title>
                <CItalicText
                  children={
                    <React.Fragment>
                      Build a living knowledge base together. Contribute
                      articles, edit, and share information seamlessly.
                    </React.Fragment>
                  }
                />
              </div>
              <div className="about-us-card align-items-flex-start mt-4">
                <img
                  src={PerformanceInsightImage}
                  className="about-us-card-image"
                  alt="Performance"
                />
                <Typography.Title level={5} className="m-0">
                  Performance Insights
                </Typography.Title>
                <CItalicText
                  children={
                    <React.Fragment>
                      Track team and individual performance. Identify knowledge
                      gaps and celebrate successes.
                    </React.Fragment>
                  }
                />
              </div>
            </div>
          </div>
          {/* <Timeline
            className="mt-4"
            mode={screens.xs ? "left" : "alternate"}
            items={[
              {
                children: (
                  <Alert
                    message={
                      <span className="font-weight-600">Dynamic Teams</span>
                    }
                    description="Create and join teams based on projects, interests, or
                departments. It's your community of experts."
                    type="success"
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  />
                ),
                color: "green",
              },
              {
                children: (
                  <Alert
                    message={
                      <span className="font-weight-600">Real-time Q&A</span>
                    }
                    description="Got a question? Ask away! Get quick answers from your team, earn points for insightful replies, and watch your knowledge grow."
                    type="error"
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  />
                ),
                color: "red",
              },
              {
                children: (
                  <Alert
                    message={
                      <span className="font-weight-600">
                        Collaborative Articles
                      </span>
                    }
                    description="Build a living knowledge base together. Contribute articles, edit, and share information seamlessly."
                    type="warning"
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  />
                ),
                color: "gray",
              },
              {
                color: "blue",
                children: (
                  <Alert
                    message={
                      <span className="font-weight-600">
                        Performance Insights
                      </span>
                    }
                    description="Track team and individual performance. Identify knowledge gaps and celebrate successes."
                    type="info"
                    style={{
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  />
                ),
              },
            ]}
          /> */}
        </div>
        <div
          id="howitworks"
          className="relative min-w-100 d-flex flex-column how-it-works-container "
        >
          <Typography.Title level={2} className="text-center section-heading">
            How does it works
          </Typography.Title>
          <CItalicText
            className="mt-1 text-center"
            children={
              <React.Fragment>
                Our platform enables employees to form diverse teams based on
                shared interests, projects, or departments. Within these teams,
                members can post questions, discuss challenges, and offer
                solutions. Every contribution, whether it's answering a query or
                providing valuable insights, is recognized and rewarded with
                points, fostering a competitive yet collaborative spirit.
                <br /> <br /> Team owners have complete visibility into team
                performance, allowing them to track individual contributions and
                identify knowledge gaps. This data-driven approach empowers
                leaders to make informed decisions and optimize team dynamics.
                <br />
                <br />
                To revolutionize the way teams work by providing a platform that
                fuels collaboration, accelerates knowledge sharing, and drives
                innovation. We're committed to empowering employees, fostering a
                culture of learning, and helping businesses thrive.
              </React.Fragment>
            }
          />
          <Row
            gutter={[16, 16]}
            className="mt-5 d-flex  justify-content-space-evenly"
          >
            <Col xs={24} sm={8} md={6} lg={4} className="text-center">
              {/* <LockKeyholeOpenIcon
                size="48"
                className="cursor-pointer how-it-works-lock-icon color-danger"
              /> */}
              <img
                src={PotentialImage}
                className="how-it-works-image"
                alt="Dynamic Team"
              />
              <Typography.Title level={5} className="m-0">
                Unlock your team's full potential
              </Typography.Title>
            </Col>
            <Col xs={24} sm={8} md={6} lg={4} className="text-center">
              {/* <BrainCogIcon
                size="48"
                className="cursor-pointer how-it-works-brain-icon color-success"
              /> */}
              <img
                src={ProblemSolvingImage}
                className="how-it-works-image"
                alt="Dynamic Team"
              />
              <Typography.Title level={5} className="m-0">
                Accelerate problem-solving
              </Typography.Title>
            </Col>
            <Col xs={24} sm={8} md={6} lg={4} className="text-center">
              {/* <DatabaseIcon
                size="48"
                className="cursor-pointer how-it-works-database-icon"
              /> */}
              <img
                src={DatabaseImage}
                className="how-it-works-image"
                alt="Dynamic Team"
              />
              <Typography.Title level={5} className="m-0">
                Build a robust knowledge base
              </Typography.Title>
            </Col>
            <Col xs={24} sm={8} md={6} lg={4} className="text-center">
              {/* <HandshakeIcon
                size="48"
                className="cursor-pointer how-it-works-handShake-icon color-warning"
              /> */}
              <img
                src={CollabrativeImage}
                className="how-it-works-image"
                alt="Dynamic Team"
              />
              <Typography.Title level={5} className="m-0">
                Enhance employee engagement
              </Typography.Title>
            </Col>
            <Col xs={24} sm={8} md={6} lg={4} className="text-center">
              {/* <LightbulbIcon
                size="48"
                className="cursor-pointer how-it-works-bulb-icon color-info"
              /> */}
              <img
                src={InnovationImage}
                className="how-it-works-image"
                alt="Dynamic Team"
              />
              <Typography.Title level={5} className="m-0">
                Drive innovation
              </Typography.Title>
            </Col>
          </Row>
        </div>
        <div
          id="pricing"
          className="relative min-w-100 d-flex flex-column pricing-container"
        >
          <div className="custom-shape-divider-top-1727879256">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M1200 0L0 0 598.97 114.72 1200 0z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          <Typography.Title level={2} className="text-center section-heading">
            Find the best plan for you!
          </Typography.Title>
          <CItalicText
            className="text-center"
            children={
              <React.Fragment>
                Select Subscription plan that best suits for you.
              </React.Fragment>
            }
          />
          <Row gutter={[16, 16]} className="mt-4 d-flex justify-content-center">
            {subscriptions?.map((subscription, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <CSubscriptionCard
                  details={subscription}
                  color={
                    SUBSCRIPTION_CARDS_COLORS[
                      (index % SUBSCRIPTION_CARDS_COLORS.length) as number
                    ]
                  }
                  buttonType={index % 2 !== 0 ? "primary" : "default"}
                  afterClass={
                    SUBSCRIPTION_CARD_AFTER_CLASS[
                      index % SUBSCRIPTION_CARDS_COLORS.length
                    ]
                  }
                />
              </Col>
            ))}
          </Row>
        </div>
        <PFAQs />
        <PContactUs />
      </div>
    </React.Fragment>
  );
};

export default PHome;
