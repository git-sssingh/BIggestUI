import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { start, stop } from "../redux/slices/loaderSlice";
import { getCompanySubscriptions, getSubscriptionById } from "../apis";
import { ISubscription } from "../interfaces/subscription";
import { IApiResponse } from "../interfaces/commons";
import { error } from "../redux/slices/notificationSlice";
import { Alert, Descriptions, DescriptionsProps, Tag, Typography } from "antd";
import CButton from "./CButton";
import { ICompanySubscriptionResponse } from "../interfaces/company";
import { CheckIcon, XIcon } from "../utilities/icons";
import { formatNumber, getDateInFormat, getTimeByAgo } from "../utilities";
import { ROUTES, SUBSCRIPTION_RENEW_NOTIFICATION_DAYS } from "../constants";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const CMembership = () => {
  const { CompanyId } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const controller = new AbortController();
  const [subscriptions, setSubscriptions] = useState<
    ICompanySubscriptionResponse[]
  >([]);

  const fetchSubscription = () => {
    dispatch(start());
    getCompanySubscriptions(CompanyId, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setSubscriptions(res?.data?.data);
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  };

  const items: DescriptionsProps["items"] = useMemo(() => {
    if (subscriptions && subscriptions?.length > 0) {
      return [
        {
          key: "1",
          label: "Subscription",
          children: subscriptions[0]?.title,
        },
        {
          key: "2",
          label: "Purchased On",
          children: getDateInFormat(subscriptions[0]?.dateOptedIn),
        },
        {
          key: "3",
          label: "Valid Till",
          children: getDateInFormat(subscriptions[0]?.expiringDate),
        },
        {
          key: "4",
          label: "Status",
          children: subscriptions[0]?.isActive ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="red">Expired</Tag>
          ),
        },
        {
          key: "5",
          label: "Unlocked Features",
          children: (
            <React.Fragment>
              <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                <CheckIcon height={16} className="color-success" />
                <Typography.Text>
                  {formatNumber(subscriptions[0]?.plan?.noOfTeamsCreate)} teams
                  allowed
                </Typography.Text>
              </div>
              <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                <CheckIcon height={16} className="color-success" />
                <Typography.Text>
                  {formatNumber(subscriptions[0]?.plan?.noOfQuestionsPost)}{" "}
                  questions allowed
                </Typography.Text>
              </div>
              <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                <CheckIcon height={16} className="color-success" />
                <Typography.Text>
                  {formatNumber(subscriptions[0]?.plan?.noOfWikisPost)} articles
                  allowed
                </Typography.Text>
              </div>
              <div className="mt-1 feature-container d-flex  align-items-center w-100-per">
                <CheckIcon height={16} className="color-success" />
                <Typography.Text>
                  {formatNumber(subscriptions[0]?.plan?.noOfUsers)} users
                  allowed
                </Typography.Text>
              </div>
              <div className="mt-1 feature-container d-flex align-items-center w-100-per">
                {subscriptions[0]?.plan?.canSeeReport ? (
                  <CheckIcon height={16} className="color-success" />
                ) : (
                  <XIcon height={16} className="color-danger" />
                )}
                <Typography.Text>See report</Typography.Text>
              </div>
            </React.Fragment>
          ),
        },
      ];
    }
  }, [subscriptions]);

  useEffect(() => {
    CompanyId && fetchSubscription();

    return () => controller.abort();
  }, [CompanyId]);

  if (subscriptions) {
    console.log(Math.abs(dayjs().diff(subscriptions[0]?.expiringDate, "days")));
  }

  return (
    <div className="mt-2">
      {subscriptions &&
        Math.abs(dayjs().diff(subscriptions[0]?.expiringDate, "days")) <=
          SUBSCRIPTION_RENEW_NOTIFICATION_DAYS && (
          <Alert
            message={`Your membership will be expired ${getTimeByAgo(
              subscriptions[0]?.expiringDate
            )}`}
            type="error"
            action={<CButton text="Renew" type="primary" />}
          />
        )}

      {/* START: Just for testing by you (shashi), Will remove in the next PR */}
      <Alert
        message={`Your membership will be expired ${getTimeByAgo(
          subscriptions[0]?.expiringDate
        )}`}
        type="error"
        action={
          <CButton
            text="Renew"
            type="primary"
            onClick={() =>
              navigate(
                ROUTES.renewSubscription?.replace(
                  ":id",
                  subscriptions[0]?.subscritionId
                ),
                {
                  state: {
                    companyId: CompanyId,
                    subscriptionId: subscriptions[0]?.subscritionId,
                  },
                }
              )
            }
          />
        }
      />
      {/* END: Just for testing by you (shashi) */}
      <Descriptions
        column={2}
        className="mt-2 mb-2 membership-details"
        title="Membership Details"
        layout="vertical"
        bordered
        items={items}
      />
    </div>
  );
};

export default CMembership;
