import { Button } from "antd";
import React, { CSSProperties } from "react";

type CButtonProps = {
  text: string | React.ReactNode;
  type: "primary" | "default" | "dashed" | "link" | "text";
  onClick?: () => void;
  className?: string;
  htmlType?: "button" | "submit" | "reset";
  disabled?: boolean;
  Icon?: React.ReactNode;
  style?: CSSProperties;
  size?: "large" | "middle" | "small";
};

const CButton = ({
  text,
  type,
  onClick,
  className,
  htmlType,
  Icon,
  disabled = false,
  style = {},
  size,
}: CButtonProps) => {
  return (
    <Button
      size={size}
      type={type}
      onClick={() => onClick && onClick()}
      htmlType={htmlType}
      className={className}
      disabled={disabled}
      icon={Icon}
      style={style}
    >
      {text}
    </Button>
  );
};

export default CButton;
