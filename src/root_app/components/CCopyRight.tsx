import React from "react";

type CCopyRightProps = {
  className?: string;
};

const CCopyRight: React.FC<CCopyRightProps> = ({ className }) => {
  return (
    <div className={className}>
      Yaksha Prashna ©{new Date().getFullYear()} All Rights Reserved
    </div>
  );
};

export default CCopyRight;
