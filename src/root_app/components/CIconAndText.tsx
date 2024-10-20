import { Space } from "antd";
import React from "react";
import { memo } from "react";

type IconTextProps = {
  icon: React.ReactNode;
  text: string | React.ReactNode;
  textClassName?: string;
};

const IconText: React.FC<IconTextProps> = ({ icon, text, textClassName }) => (
  <Space className="d-flex align-items-center icon-text-container">
    {icon}
    <span className={`text-container ${textClassName}`}>{text}</span>
  </Space>
);

export default memo(IconText);
