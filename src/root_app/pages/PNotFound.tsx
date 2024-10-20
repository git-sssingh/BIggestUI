import { Result } from "antd";
import React from "react";
import { CButton, CFooter, CNavbar } from "../components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

const PNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-100 d-flex justify-content-center align-items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <CButton
            type="primary"
            text="Back Home"
            onClick={() => navigate(ROUTES.home)}
          />
        }
      />
    </div>
  );
};

export default PNotFound;
