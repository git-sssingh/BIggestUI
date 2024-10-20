import { Modal } from "antd";
import React, { useState } from "react";
import { CModalHandler } from "../types";

type CModalProps = {
  title?: string;
  children: React.ReactNode;
};



const CModal: React.ForwardRefRenderFunction<CModalHandler, CModalProps> = (
  props,
  ref
) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  React.useImperativeHandle(ref, () => ({
    modalOpen: (value: boolean) => setModalOpen(value),
    close: () => setModalOpen(false),
  }));

  // if (!modalOpen) return null;

  return (
    <Modal
      title={props.title || ""}
      centered
      open={modalOpen}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      closable={false}
      onOk={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setModalOpen(false);
      }}
    >
      {props?.children}
    </Modal>
  );
};

export default React.memo(React.forwardRef(CModal));
