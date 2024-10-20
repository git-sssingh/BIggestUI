import { Button } from "antd";
import React from "react";
import { CTooltip } from ".";

type CIconButtonProp = {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
};

const CIconButton: React.FC<CIconButtonProp> = ({
  icon,
  tooltip = "",
  className = "",
  ariaLabel = "",
  disabled = false,
  onClick = () => {},
  style = {},
}) => {
  return (
    <CTooltip title={tooltip}>
      <Button
        className={className}
        disabled={disabled}
        aria-label={ariaLabel}
        icon={icon}
        onClick={onClick}
        style={style}
      />
    </CTooltip>
  );
};

export default CIconButton;
