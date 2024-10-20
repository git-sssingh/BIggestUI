import { Space, Tooltip, Button } from "antd";
import React, { memo } from "react";
import { formatNumber } from "../utilities";
import { BookmarkCheckIcon } from "../utilities/icons";

type CBookmarkedCountProps = {
  count: number;
  className?: string;
};

const CBookmarkedCount: React.FC<CBookmarkedCountProps> = ({
  count,
  className,
}) => {
  return (
    <Space.Compact className={className}>
      <Tooltip title="Bookmark count">
        <Button
          style={{ color: "#8a9a5b" }}
          className="font-16"
          icon={<BookmarkCheckIcon height="16" />}
        >
          {formatNumber(count) || 0}
        </Button>
      </Tooltip>
    </Space.Compact>
  );
};

export default memo(CBookmarkedCount);
