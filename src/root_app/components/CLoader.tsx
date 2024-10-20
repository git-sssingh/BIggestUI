import { Spin } from "antd";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type CLoaderProps = {
  children: React.ReactNode;
};

const CLoader: React.FC<CLoaderProps> = ({ children }) => {
  const { loading } = useSelector((state: RootState) => state.loader);
  return (
    <Spin tip={loading && "Loading"} size="large" spinning={loading}>
      {children}
    </Spin>
  );
};

export default memo(CLoader);
