import { Typography } from "antd";
import React, { memo } from "react";

type CItalicTextProps = {
  children: React.ReactNode | string;
  className?: string;
};

const CItalicText: React.FC<CItalicTextProps> = ({ children, className }) => {
  return (
    <Typography.Text
      italic
      style={{ color: "#737272" }}
      className={`mt-1 ${className}`}
    >
      {children}
    </Typography.Text>
  );
};

export default memo(CItalicText);
