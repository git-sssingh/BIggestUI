import { Avatar } from "antd";
import React, { memo } from "react";
import { UserRoundIcon } from "../utilities/icons";

type CAvatarProps = {
  src?: string;
  height?: string;
  width?: string;
  className?: string;
};

const CAvatar: React.FC<CAvatarProps> = ({ src, height, width, className }) => {
  return (
    <Avatar
      src={src}
      style={{ backgroundColor: "#055cb4", height: height, width: width }}
      className={className}
      icon={<UserRoundIcon />}
    />
  );
};

export default memo(CAvatar);
