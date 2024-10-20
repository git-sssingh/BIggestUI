import { Modal, Popconfirm } from "antd";
import React, { useState } from "react";
import { CircleHelpIcon } from "../utilities/icons";
import { CPopupConfirmHandle } from "../types";

type CPopupConfirmProps = {
  title: string;
  description: string;
  onConfirm: () => void;
};

const CPopupConfirm: React.ForwardRefRenderFunction<
  CPopupConfirmHandle,
  CPopupConfirmProps
> = (props, ref) => {
  const { title, onConfirm, description } = props;
  const [open, setOpen] = useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    open: (value: boolean) => setOpen(value),
  }));

  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);

  return (
    <Modal
      centered
      title={title}
      open={open}
      onOk={() => {
        setOpen(false);
        onConfirm();
      }}
      onCancel={() => setOpen(false)}
      okText="Yes"
      cancelText="No"
    >
      {description}
    </Modal>
  );

  // return (
  //   <Popconfirm
  //     title={title}
  //     description={description}
  //     icon={icon}
  //     open={open}
  //     onConfirm={() => {
  //       setOpen(false);
  //       onConfirm();
  //     }}
  //     onCancel={() => setOpen(false)}
  //   >
  //     {children}
  //   </Popconfirm>
  // );
};

export default React.memo(React.forwardRef(CPopupConfirm));
