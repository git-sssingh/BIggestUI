import { Button, Dropdown, DropdownProps, MenuProps, Space } from "antd";
import React, { memo, useState } from "react";

type CDropdownProps = {
  items: MenuProps["items"];
  children: React.ReactNode;
  className?: string;
};

const CDropdown: React.FC<CDropdownProps> = ({
  items,
  children,
  className,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };
  return (
    <Dropdown
      autoAdjustOverflow
      className={className}
      menu={{ items }}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Space onClick={(e) => e.preventDefault()}>{children}</Space>
    </Dropdown>
  );
};

export default memo(CDropdown);
