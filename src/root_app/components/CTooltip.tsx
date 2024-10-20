import { Tooltip } from "antd";
import React from "react";

type CTooltipProp = {
  title: string;
  children?: React.ReactNode;
};

const CTooltip: React.FC<CTooltipProp> = ({ title, children }) => {
  return <Tooltip title={title}>{children}</Tooltip>;
};

export default CTooltip;
