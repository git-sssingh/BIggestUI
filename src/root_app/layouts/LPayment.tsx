import { Card, Col, Divider, Layout, Row, Statistic, Typography } from "antd";
import React, { useEffect } from "react";
import { CFooter, CNavbar } from "../components";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import card from "antd/es/card";
import { formatNumber } from "../utilities";
import { get } from "../redux/slices/subscriptionsSlice";
import { ROUTES } from "../constants";

const { Content, Sider } = Layout;

const LPayment = () => {
  const { id } = useParams<string>();
  const { subscriptions, searchedSubscription } = useSelector(
    (state: RootState) => state.subscriptions
  );
  const { CompanyId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const handleCardClick = (subscriptionId: string) => {
    if (pathname?.includes(ROUTES.renewSubscription?.split("/")[1])) {
      navigate(ROUTES.renewSubscription?.replace(":id", subscriptionId), {
        state: { subscriptionId: subscriptionId, companyId: CompanyId },
      });
      dispatch(get(subscriptionId));
    }
    if (pathname?.includes(ROUTES.purchaseSubscription?.split("/")[1])) {
      navigate(ROUTES.purchaseSubscription.replace(":id", subscriptionId), {
        state: {
          subscription: subscriptions?.find(
            (sub) => sub?.id === subscriptionId
          ),
          companyDetails: state?.companyDetails,
        },
      });
      dispatch(get(subscriptionId));
    }
  };

  useEffect(() => {
    id && dispatch(get(id));
  }, [id]);

  return (
    <Layout>
      <CNavbar />
      <Content>
        <div
          className="mt-8 min-h-100"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} className="p-24">
              {subscriptions?.map((subscription, index) => (
                <Card
                  className={`${
                    index === 0 ? "mt-0" : "mt-1"
                  } payment-layout-cards ${
                    [searchedSubscription?.id, id]?.includes(
                      subscription?.id
                    ) && "payment-layout-active-cards"
                  }`}
                  key={index}
                  bordered={false}
                  hoverable
                  onClick={() => handleCardClick(subscription?.id)}
                >
                  <Typography.Title level={4} className="m-0">
                    {subscription?.title}
                  </Typography.Title>
                  <Divider className="mt-1 mb-1" />
                  <div className="d-flex align-items-center justify-content-space-between">
                    <Typography.Text>Validity</Typography.Text>
                    <Typography.Text className="font-weight-700">
                      {subscription?.validDay} Days
                    </Typography.Text>
                  </div>
                  <div className="d-flex align-items-center justify-content-space-between">
                    <Typography.Text>Amount</Typography.Text>
                    <Typography.Text className="font-weight-700">
                      ${subscription?.amount}
                    </Typography.Text>
                  </div>
                </Card>
              ))}
            </Col>
            <Col xs={24} sm={24} md={16} className="p-24 pt-0">
              <Outlet />
            </Col>
          </Row>
        </div>
      </Content>
      <CFooter />
    </Layout>
  );
};

export default LPayment;
