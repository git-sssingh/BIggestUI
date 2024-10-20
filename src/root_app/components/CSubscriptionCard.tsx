import { Card, Divider, Typography } from "antd";
import React from "react";
import { formatNumber } from "../utilities";
import CButton from "./CButton";
import { ISubscription } from "../interfaces/subscription";
import { CheckIcon, XIcon } from "../utilities/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

type CSubscriptionCardProps = {
  details: ISubscription;
  color: string;
  buttonType: "primary" | "default";
  afterClass: string;
};

const CSubscriptionCard: React.FC<CSubscriptionCardProps> = ({
  details,
  color,
  buttonType,
  afterClass,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className="w-100-per relative"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    >
      <div className="ribbon slant-down" style={{ backgroundColor: color }}>
        <div className="content">
          {details?.validDay} <i className="font-10">Days</i>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div
          className={`price-holder-container d-flex ${afterClass}`}
          style={{
            backgroundColor: color,
          }}
        >
          $
          <sub className="font-28 font-weight-700">
            {formatNumber(details?.amount) || 0}
          </sub>
        </div>
      </div>
      <Divider style={{ borderColor: color }}>{details?.title}</Divider>
      <div className="mt-1 feature-container d-flex justify-content-space-between align-items-center w-100-per">
        <Typography.Text>
          {formatNumber(details?.plan?.noOfTeamsCreate)} teams allowed
        </Typography.Text>
        <CheckIcon height={16} className="color-success" />
      </div>
      <div className="mt-1 feature-container d-flex justify-content-space-between align-items-center w-100-per">
        <Typography.Text>
          {formatNumber(details?.plan?.noOfQuestionsPost)} questions allowed
        </Typography.Text>
        <CheckIcon height={16} className="color-success" />
      </div>
      <div className="mt-1 feature-container d-flex justify-content-space-between align-items-center w-100-per">
        <Typography.Text>
          {formatNumber(details?.plan?.noOfWikisPost)} articles allowed
        </Typography.Text>
        <CheckIcon height={16} className="color-success" />
      </div>
      <div className="mt-1 feature-container d-flex justify-content-space-between align-items-center w-100-per">
        <Typography.Text>
          {formatNumber(details?.plan?.noOfUsers)} users allowed
        </Typography.Text>
        <CheckIcon height={16} className="color-success" />
      </div>
      <div className="mt-1 feature-container d-flex justify-content-space-between align-items-center w-100-per">
        <Typography.Text>See report</Typography.Text>
        {details?.plan?.canSeeReport ? (
          <CheckIcon height={16} className="color-success" />
        ) : (
          <XIcon height={16} className="color-danger" />
        )}
      </div>

      <CButton
        text="Purchase"
        type={buttonType}
        className={`mt-3 w-100-per font-weight-500 outline-none`}
        style={{
          borderRadius: "30px",
          color: buttonType === "primary" ? "white" : color,
          border: `1px solid ${color}`,
        }}
        onClick={() => {
          const path = ROUTES.purchaseSubscription.replace(":id", details?.id);
          navigate(ROUTES.createCompany, {
            state: {
              subscription: details,
            },
          });
        }}
      />
    </Card>
  );
};

export default CSubscriptionCard;
