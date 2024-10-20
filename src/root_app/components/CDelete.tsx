import React, { memo, useRef } from "react";
import { CPopupConfirm } from ".";
import { CircleHelpIcon, Trash2Icon } from "../utilities/icons";
import { Space, Button } from "antd";
import { CPopupConfirmHandle } from "../types";

type CDeleteProps = {
  onClick?: () => void;
  className?: string;
};

const CDelete: React.FC<CDeleteProps> = ({ className, onClick }) => {
  const cpopupConfirmRef = useRef<CPopupConfirmHandle>(null);

  return (
    <React.Fragment>
      <Space.Compact className={className}>
        <Button
          style={{ color: "#eb2f96" }}
          className="font-16"
          icon={<Trash2Icon height="16" className="color-danger" />}
          onClick={() => cpopupConfirmRef.current?.open(true)}
        />
      </Space.Compact>
      <CPopupConfirm
        ref={cpopupConfirmRef}
        title="Delete"
        description="Do you really want to delete?"
        onConfirm={() => onClick && onClick()}
      />
    </React.Fragment>
  );
};

export default memo(CDelete);
