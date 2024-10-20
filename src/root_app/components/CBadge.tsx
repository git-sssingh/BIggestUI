import { Avatar, Badge } from "antd";
import React, { memo } from "react";

type CBadgeProps = {
  count: number;
  Icon: React.ReactNode;
};

const CBadge: React.FC<CBadgeProps> = ({ count = 0, Icon }) => {
  return (
    <Badge count={Number(count)} overflowCount={99} className="mr-3 mt-1">
      <Avatar shape="square" size="large" icon={Icon} />
    </Badge>
  );
};

export default memo(CBadge);
