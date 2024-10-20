import React from "react";
import LogoImage from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { Typography } from "antd";
import { PencilIcon } from "../utilities/icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type CLogoProp = {
  className?: string;
  borderColor?: string;
  pencilColor?: string;
};

const CLogo: React.FC<CLogoProp> = ({
  className,
  borderColor,
  pencilColor,
}) => {
  const navigate = useNavigate();
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={() => navigate(ROUTES.home)}
    >
      <Typography.Title
        level={1}
        className="m-0 font-weight-700"
        style={{ color: theme.token?.colorPrimary }}
      >
        YP
      </Typography.Title>
      <div className={`logo-divider ${borderColor}`}></div>
      <PencilIcon
        className={`absolute ${pencilColor}`}
        style={{ left: "107px", top: "18px" }}
      />
    </div>
    // <img
    //   src={LogoImage}
    //   alt="logo"
    //   height="80%"
    //   width="150px"
    //   className={`cursor-pointer ${className}`}
    //   style={{ background: "#222381" }}
    //   onClick={() => navigate(ROUTES.home)}
    // />
  );
};

export default CLogo;
