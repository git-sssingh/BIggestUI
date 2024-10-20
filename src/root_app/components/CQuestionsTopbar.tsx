import React from "react";
import CButton from "./CButton";
import { Col, Divider, Grid, Row } from "antd";
import CSearchBox from "./CSearchBox";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { clear } from "../redux/slices/questionsByTagSearchSlice";

type CQuestionsTopbarProps = {
  value: string;
  setValue: (value: string) => void;
};

const { useBreakpoint } = Grid;

const CQuestionsTopbar: React.FC<CQuestionsTopbarProps> = ({
  value,
  setValue,
}) => {
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // return (
  //   <Row gutter={[8, 8]} className="question-top-bar-container">
  //     <Col xs={24} sm={24} md={16} className="d-flex justify-content-center">
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
  //     <Col xs={24} sm={24} md={8} className="d-flex justify-content-right">
  //       <CButton
  //         text="Post a Question"
  //         type={"primary"}
  //         onClick={() => navigate(ROUTES.addQuestion)}
  //       />
  //     </Col>
  //   </Row>
  // );

  return (
    <div className="d-flex align-items-center question-top-bar-container">
      <div className="search-bar-container d-flex justify-content-right mr-1">
        <CSearchBox
          defaultValue={value}
          className={`question-top-bar-search ${
            screens.xs && "w-100-per mr-1"
          }`}
          setValue={setValue}
          onClear={() => {
            setValue("");
            dispatch(clear());
          }}
        />
      </div>
      <CButton
        text="Ask Question"
        type={"primary"}
        onClick={() => navigate(ROUTES.addQuestion)}
      />
    </div>
  );
};

export default CQuestionsTopbar;
