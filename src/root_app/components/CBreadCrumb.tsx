import { Breadcrumb, Typography } from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const { Link } = Typography;

type CBreadCrumbProps = {
  className?: string;
  style?: React.CSSProperties;
};

const CBreadCrumb: React.FC<CBreadCrumbProps> = ({ className, style }) => {
  const LinkRouter = (props: any) => <Link {...props} component={RouterLink} />;
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb
      style={{ margin: "16px 0", ...style }}
      className={`d-flex flex-1 ${className}`}
    >
      <Breadcrumb.Item key="home">
        {" "}
        <LinkRouter
          component={RouterLink}
          to="/"
          className="text-decoration-none font-weight-600"
        >
          Home
        </LinkRouter>
      </Breadcrumb.Item>
      {pathnames.map((value: any, index: number) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        // Split value so the string can be transformed and parsed later.
        const path = value.split("-");

        return last ? (
          <Typography key={to} className="text-capitalize text-decoration-none">
            {path.join(" ")}
          </Typography>
        ) : (
          <BreadcrumbItem>
            <LinkRouter
              to={to}
              key={to}
              className="text-capitalize text-decoration-none"
            >
              {path.join(" ")}
            </LinkRouter>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default CBreadCrumb;
