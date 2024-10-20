import { Result, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { CButton } from ".";
import React from "react";

type CSuccessfulPurchasedSubscriptionProp = {
  id?: string;
};

const CSuccessfulPurchasedSubscription: React.FC<
  CSuccessfulPurchasedSubscriptionProp
> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Successfully Purchased Subscription"
      subTitle="You have successfully purchased a subscription and created your company."
      extra={[
        <CButton
          type="primary"
          text="Create Account"
          onClick={() => navigate(`${ROUTES.signUp}/${id}`)}
        />,
      ]}
    />
  );
};

export default CSuccessfulPurchasedSubscription;
