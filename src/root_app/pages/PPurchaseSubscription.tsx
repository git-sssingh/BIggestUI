import React, { useEffect } from "react";
import { Card, Collapse, Divider, Grid, Typography } from "antd";
import { CButton, CItalicText, CMakePayment } from "../components";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSubscriptionById } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { IPaymentDetails } from "../interfaces/company";
import { IGetSubscription } from "../interfaces/subscription";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { AppDispatch } from "../redux/store";
import { CheckIcon, XIcon } from "../utilities/icons";
import { ROUTES } from "../constants";
import { formatNumber } from "../utilities";

const PPurchaseSubscription = () => {
  const dispatch = useDispatch<AppDispatch>();
  const controller = new AbortController();
  const { id } = useParams();
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();
  const { state } = useLocation();

  const handlePayNowClick = () => {
    // make payment
    // create company
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <CMakePayment
      handlePayNowClick={handlePayNowClick}
      subscription={state?.subscription}
    />
  );
};

export default PPurchaseSubscription;
