import { Space, Tooltip, Button } from "antd";
import { MessageCircleMoreIcon } from "lucide-react";
import React, { memo } from "react";
import { formatNumber } from "../utilities";
import { CTooltip } from ".";

type CCommentsCountProps = {
  count: number;
  onClick?: () => void;
  className?: string;
};

const CCommentsCount: React.FC<CCommentsCountProps> = ({
  count,
  onClick,
  className,
}) => {
  return (
    <Space.Compact className={className}>
      <CTooltip title="Comments">
        <Button
          style={{ color: "#9eb08a" }}
          className="font-16"
          icon={<MessageCircleMoreIcon height="16" />}
          onClick={() => onClick && onClick()}
        >
          {formatNumber(count) || 0}
        </Button>
      </CTooltip>
    </Space.Compact>
  );
};

export default memo(CCommentsCount);
