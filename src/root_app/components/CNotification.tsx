import React, { memo, useCallback, useEffect } from "react";
import { Button, notification, Space } from "antd";
import type { NotificationArgsProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type NotificationPlacement = NotificationArgsProps["placement"];

const CNotification: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const { type, message } = useSelector(
    (state: RootState) => state.notification
  );

  const openNotification = () => {
    api[type]({
      message: type?.toUpperCase(),
      description: message,
      placement: "topRight",
      showProgress: true,
      pauseOnHover: true,
    });
  };

  useEffect(() => {
    type && message && openNotification();
  }, [type, message]);

  return <>{contextHolder}</>;
};

export default CNotification;
