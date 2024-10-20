import React, { memo } from "react";
import { Button, Input, Space, Tooltip, Typography } from "antd";
import copy from "copy-to-clipboard";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { FilesIcon } from "../utilities/icons";

const CShareLinkModal: React.FC = () => {
  const copyToClipboard = () => copy(window.location.href);

  return (
    <React.Fragment>
      <Space.Compact block>
        <Input value={window.location.href} readOnly />
        <Tooltip title="Copy url">
          <Button icon={<FilesIcon height="16" />} onClick={copyToClipboard} />
        </Tooltip>
      </Space.Compact>
      <Typography.Title level={5} className="mt-2">
        Share via
      </Typography.Title>
      <div className="d-flex mt-1">
        <FacebookShareButton url={window.location.href}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <WhatsappShareButton url={window.location.href}>
          <WhatsappIcon size={40} round={true} className="ml-1" />
        </WhatsappShareButton>
        <RedditShareButton url={window.location.href}>
          <RedditIcon size={40} className="ml-1" />
        </RedditShareButton>
      </div>
    </React.Fragment>
  );
};

export default memo(CShareLinkModal);
