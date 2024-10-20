import React from "react";

import { Divider, Layout } from "antd";
import { FOOTER_MENUS } from "../utilities/menus";
import { Space, Typography } from "antd";
import { CCopyRight } from ".";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
const { Text, Link } = Typography;

const { Footer } = Layout;

type CFooterProps = {
  className?: string;
};

const CFooter: React.FC<CFooterProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <Footer className={`text-center bg-dark color-white ${className}`}>
      <React.Fragment>
        {FOOTER_MENUS.map((menu, index) => (
          <React.Fragment key={menu.literal}>
            <Link
              className="color-white"
              onClick={() =>
                [
                  "privacypolicy",
                  "termsofuse",
                  "reportAnIssue",
                  "createSubscription",
                ].includes(menu.key as string)
                  ? navigate(menu.route as string)
                  : navigate(ROUTES.home, {
                      state: { page: menu.key },
                    })
              }
            >
              {menu.literal}
            </Link>
            {index !== FOOTER_MENUS.length - 1 && <Divider type="vertical" />}
          </React.Fragment>
        ))}
      </React.Fragment>
      <br />
      <br />
      <CCopyRight />
    </Footer>
  );
};

export default CFooter;
