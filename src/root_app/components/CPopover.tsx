import React from "react";
import { Button, Popconfirm, Popover } from "antd";

const style: React.CSSProperties = {
  width: "300vw",
  height: "300vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

type CPopoverProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  content?: React.ReactNode;
};

type CPopoverHandler = {
  open: (value: boolean) => void;
};

const CPopover: React.ForwardRefRenderFunction<
  CPopoverHandler,
  CPopoverProps
> = (props, forwardedRef) => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useImperativeHandle(forwardedRef, () => ({
    open: (value: boolean) => setOpen(value),
  }));

  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  return (
    <div style={style}>
      <Popover content={props?.content || ""} open={open}>
        {props?.children}
      </Popover>
    </div>
  );
};

export default React.memo(React.forwardRef(CPopover));
