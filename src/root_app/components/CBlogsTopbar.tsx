import React from "react";
import CButton from "./CButton";
import { Col, Divider, Grid, Row } from "antd";
import CSearchBox from "./CSearchBox";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { clear } from "../redux/slices/blogsByTagSearchSlice";

type CBlogsTopbarProps = {
  value: string;
  setValue: (value: string) => void;
};

const { useBreakpoint } = Grid;

const CBlogsTopbar: React.FC<CBlogsTopbarProps> = ({ value, setValue }) => {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // return (
  //   <div
  //     className="question-top-bar-container"
  //     // style={{ margin: screens.xs ? "0px" : "0px p-16" }}
  //   >
  //     <Col xs={24} sm={24} md={18} className="d-flex">
  //       <CSearchBox
  //         className={`question-top-bar-search ${screens.xs && "w-100-per"}`}
  //         defaultValue={value}
  //         setValue={setValue}
  //         onClear={() => {
  //           setValue("");
  //           dispatch(clear());
  //         }}
  //       />
  //     </Col>
  //     <Col xs={24} sm={24} md={5}>
  //       <CButton
  //         text="Write an Article"
  //         type={"primary"}
  //         onClick={() => navigate(ROUTES.addBlog)}
  //       />
  //     </Col>
  //   </div>
  // );

  return (
    <div className="d-flex align-items-center justify-content-space-between question-top-bar-container">
      <div className="search-bar-container d-flex justify-content-right mr-1">
        <CSearchBox
          className={`question-top-bar-search ${
            screens.xs && "w-100-per mr-1"
          }`}
          defaultValue={value}
          setValue={setValue}
          onClear={() => {
            setValue("");
            dispatch(clear());
          }}
        />
      </div>
      <CButton
        text="Write an Article"
        type={"primary"}
        onClick={() => navigate(ROUTES.addBlog)}
      />
    </div>
  );
};

export default CBlogsTopbar;
