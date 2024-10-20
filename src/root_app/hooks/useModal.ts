import React from "react";
import { CModal } from "../components";

const useAntModal = () => {
  type CModalHandler = React.ElementRef<typeof CModal>;
  const ModalRef = React.useRef<CModalHandler>(null);
  return ModalRef;
};

export default useAntModal;
