import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { getSubscriptionById } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error } from "../redux/slices/notificationSlice";
import { ISubscription } from "../interfaces/subscription";
import { CMakePayment } from "../components";
import { useSelector } from "react-redux";

const RenewSubscription = () => {
  const { state } = useLocation();

  const { searchedSubscription } = useSelector(
    (state: RootState) => state.subscriptions
  );

  const handlePayNowClick = () => {
    // make payment
    // create company
  };

  return (
    <CMakePayment
      handlePayNowClick={handlePayNowClick}
      subscription={searchedSubscription as ISubscription}
    />
  );
};

export default RenewSubscription;
