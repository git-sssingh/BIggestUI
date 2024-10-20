import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import dayjs from "dayjs";
import { postRefreshToken } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { setAuthLocalStorage } from "../storage/local";
import { CALL_REFRESH_TOKEN_BEFORE } from "../constants";

const RefreshAccessTokenIfNecessary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { exp } = useSelector((state: RootState) => state.user);
  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  const refreshAccessToken = (signal: AbortSignal) => {
    if (accessToken && refreshToken) {
      postRefreshToken({ accessToken, refreshToken }, signal).then(
        (res: IApiResponse) => {
          if (res?.status === 200 && res?.data?.data) {
            setAuthLocalStorage(res?.data?.data);
          }
        }
      );
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (exp) {
      const interval: number = dayjs
        .unix(Number(exp))
        .subtract(CALL_REFRESH_TOKEN_BEFORE, "minutes")
        .unix();

      if (interval < dayjs().unix()) {
        refreshAccessToken(controller.signal);
      }
    }

    return () => controller.abort();
  }, [exp]);

  return children;
};

export default RefreshAccessTokenIfNecessary;
