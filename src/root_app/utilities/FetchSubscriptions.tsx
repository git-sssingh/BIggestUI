import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { getSubscriptions } from "../apis";
import { start, stop } from "../redux/slices/loaderSlice";
import { IApiResponse } from "../interfaces/commons";
import { get, set } from "../redux/slices/subscriptionsSlice";
import { useParams } from "react-router-dom";

const FetchSubscriptions = ({ children }: { children: React.ReactNode }) => {
  const { subscriptions } = useSelector(
    (state: RootState) => state.subscriptions
  );
  const { id } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const controller = new AbortController();
    if (subscriptions?.length === 0) {
      dispatch(start());
      getSubscriptions(controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            dispatch(set(res?.data?.data));
            id ? dispatch(get(id)) : dispatch(get(res?.data?.data[0]?.id));
          }
        })
        .finally(() => dispatch(stop()));
    }

    return () => controller.abort();
  }, []);

  return children;
};

export default FetchSubscriptions;
