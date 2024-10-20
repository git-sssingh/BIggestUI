import {
  WarningOutlined,
  MailOutlined,
  MobileOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Space, Dropdown, Button } from "antd";
import React, { memo, useRef } from "react";
import CTooltip from "./CTooltip";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  EllipsisIcon,
  Share2Icon,
} from "../utilities/icons";
import { CModal, CShareLinkModal } from ".";
import useAntModal from "../hooks/useModal";
import { CModalHandler } from "../types";

type CMoreActionsProps = {
  className?: string;
  bookmarked?: boolean;
  onBookmarkClick: () => void;
};

const CMoreActions: React.FC<CMoreActionsProps> = ({
  className,
  bookmarked,
  onBookmarkClick,
}) => {
  const modelRef = useRef<CModalHandler | null>(null);

  return (
    <Space.Compact className={className}>
      <Dropdown
        placement="bottomRight"
        arrow
        menu={{
          items: [
            {
              key: "1",
              label: bookmarked ? "Remove Bookmark" : "Bookmark",
              icon: bookmarked ? (
                <BookmarkCheckIcon style={{ color: "#8a9a5b" }} height="16" />
              ) : (
                <BookmarkIcon style={{ color: "#8a9a5b" }} height="16" />
              ),
              onClick: onBookmarkClick,
            },
            {
              key: "2",
              label: "Share",
              icon: <Share2Icon height="16" />,
              onClick: () => modelRef.current?.modalOpen(true),
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button
          style={{ borderStartEndRadius: 6, borderEndEndRadius: 6 }}
          icon={<EllipsisIcon />}
        />
      </Dropdown>
      <CModal
        ref={modelRef}
        title="Share Link"
        children={<CShareLinkModal />}
      />
    </Space.Compact>
  );
};

export default memo(CMoreActions);
