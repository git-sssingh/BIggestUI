import React, { useEffect } from "react";
import { getLoginCookie } from "../storage/cookies";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { postSignIn } from "../apis";
import { ROUTES } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import { saveAuth } from "../redux/slices/authSlice";
import { error } from "../redux/slices/notificationSlice";
import { save } from "../redux/slices/userSlice";
import {
  setAuthLocalStorage,
  getLastVisitedUrlLocalStorage,
} from "../storage/local";
import { DecodeTokenType } from "../types";
import { decodeToken } from "./functions";
import { IAuthentication, ISignIn } from "../interfaces/user";

const RememberMe = ({ children }: { children: React.ReactNode }) => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();

  const loginUserIfNecessary = (data: ISignIn) => {
    dispatch(start());
    postSignIn(data, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200 && res?.data?.data) {
          const responseData = res?.data?.data as IAuthentication;
          dispatch(saveAuth(responseData));
          setAuthLocalStorage(responseData);
          const decodedToken: DecodeTokenType = decodeToken<DecodeTokenType>(
            responseData?.accessToken
          );
          if (decodedToken) {
            dispatch(save(decodedToken));
          } else {
            dispatch(error("Invalid token!"));
          }
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong!"
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };

  useEffect(() => {
    const loginCookie = getLoginCookie();
    if (loginCookie) {
      loginUserIfNecessary(loginCookie);
    }

    return () => controller.abort();
  }, []);

  return children;
};

export default RememberMe;
