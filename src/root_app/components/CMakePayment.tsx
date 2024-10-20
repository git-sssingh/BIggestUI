import React from "react";
import { ISubscription } from "../interfaces/subscription";
import { Card, Collapse, Divider, Grid, Typography } from "antd";
import { CheckIcon, XIcon } from "lucide-react";
import { ROUTES } from "../constants";
import { formatNumber } from "../utilities";
import CButton from "./CButton";
import CItalicText from "./CItalicText";
import { useNavigate } from "react-router-dom";

type CMakePaymentProps = {
  handlePayNowClick: () => void;
  subscription: ISubscription;
};

const CMakePayment: React.FC<CMakePaymentProps> = ({
  handlePayNowClick,
  subscription,
}) => {
  const screens = Grid.useBreakpoint();
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center min-h-100 pt-24 pb-24">
      <Card bordered={false} className="w-100-per">
        <Typography.Title className="d-inline-block" level={4}>
          {subscription?.title} ({subscription?.validDay} days)
        </Typography.Title>

        <Divider />
        <div className="d-flex align-items-center justify-content-space-between">
          <Typography.Text>Billing Amount</Typography.Text>
          <Typography.Text className="font-weight-700">
            ${subscription?.amount}
          </Typography.Text>
        </div>
        <Divider />
        <Collapse
          items={[
            {
              key: "1",
              label: <strong>What's included</strong>,
              children: (
                <React.Fragment>
                  <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                    <CheckIcon height={16} className="color-success" />
                    <Typography.Text>
                      {formatNumber(subscription?.plan?.noOfTeamsCreate)} teams
                      allowed
                    </Typography.Text>
                  </div>
                  <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                    <CheckIcon height={16} className="color-success" />
                    <Typography.Text>
                      {formatNumber(subscription?.plan?.noOfQuestionsPost)}{" "}
                      questions allowed
                    </Typography.Text>
                  </div>
                  <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                    <CheckIcon height={16} className="color-success" />
                    <Typography.Text>
                      {formatNumber(subscription?.plan?.noOfWikisPost)} articles
                      allowed
                    </Typography.Text>
                  </div>
                  <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                    <CheckIcon height={16} className="color-success" />
                    <Typography.Text>
                      {formatNumber(subscription?.plan?.noOfUsers)} users
                      allowed
                    </Typography.Text>
                  </div>
                  <div className="mt-1 feature-container d-flex align-items-center w-100-per">
                    {subscription?.plan?.canSeeReport ? (
                      <CheckIcon height={16} className="color-success" />
                    ) : (
                      <XIcon height={16} className="color-danger" />
                    )}
                    <Typography.Text>See report</Typography.Text>
                  </div>
                </React.Fragment>
              ),
            },
          ]}
        />
      </Card>
      <Card bordered={false} className="w-100-per mt-4">
        <Typography.Title className="d-inline-block" level={4}>
          <CButton text="Pay Now" type="primary" onClick={handlePayNowClick} />
        </Typography.Title>
      </Card>
    </div>
  );
};

export default CMakePayment;
