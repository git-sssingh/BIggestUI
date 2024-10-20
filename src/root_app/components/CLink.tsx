import React, { memo } from "react";
import { Typography } from "antd";

const { Link } = Typography;

type CLinkProps = {
  children: string;
  path: string;
  target?: string;
  className?: string;
};

const CLink = memo(({ children, path, target, className }: CLinkProps) => {
  return (
    <Link href={`/#${path}`} target={target} className={className}>
      {children}
    </Link>
  );
});

export default CLink;
