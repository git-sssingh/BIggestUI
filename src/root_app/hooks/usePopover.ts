import React from "react";
import { CPopover } from "../components";

const usePopover = () => {
  type CPopoverHandler = React.ElementRef<typeof CPopover>;
  const PopoverRef = React.useRef<CPopoverHandler>(null);
  return PopoverRef;
};

export default usePopover;
