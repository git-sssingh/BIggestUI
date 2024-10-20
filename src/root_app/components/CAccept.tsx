import React, { memo } from "react";
import { CButton, CTooltip } from ".";
import { CheckCheckIcon } from "../utilities/icons";
import { Button, Space } from "antd";

type CAcceptProps = {
  onClick: () => void;
  className?: string;
};

const CAccept: React.FC<CAcceptProps> = ({ onClick, className }) => {
  return (
    <Space.Compact className={className}>
      <CTooltip title="Accept">
        <Button
          style={{ color: "#006994" }}
          className="font-16"
          icon={<CheckCheckIcon height="16" />}
          onClick={onClick}
        />
      </CTooltip>
    </Space.Compact>
  );
};

export default memo(CAccept);
