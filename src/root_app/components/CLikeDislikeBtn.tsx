import { Button, Radio, Space, Tooltip } from "antd";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";
import React, { memo } from "react";
import { formatNumber } from "../utilities";

type CLikeDislikeBtnProps = {
  likes: number;
  disabled?: boolean;
  onLikeBtnClick?: () => void;
  onDisLikeBtnClick?: () => void;
};

const CLikeDislikeBtn: React.FC<CLikeDislikeBtnProps> = ({
  likes,
  onDisLikeBtnClick,
  onLikeBtnClick,
  disabled = false,
}) => {
  return (
    <Space.Compact>
      <Tooltip title="Like">
        <Button
          title={
            disabled
              ? "You're the author of this post. So, you may not like"
              : ""
          }
          disabled={disabled}
          style={{ color: "rgb(22, 119, 255)" }}
          className="font-16"
          icon={<ThumbsUpIcon height="16" />}
          onClick={onLikeBtnClick}
        >
          {formatNumber(likes) || 0}
        </Button>
      </Tooltip>
      <Tooltip title="Dislike">
        <Button
          title={
            disabled
              ? "You're the author of this post. So, you may not dislike"
              : ""
          }
          disabled={disabled}
          style={{ color: "#673147" }}
          onClick={onDisLikeBtnClick}
          className="font-16"
          icon={<ThumbsDownIcon height="16" />}
        />
      </Tooltip>
    </Space.Compact>
  );
};

export default memo(CLikeDislikeBtn);
