import { Col, Divider, Grid, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { CFooter, CNavbar, CQuestionsTopbar } from "../components";
import { Outlet } from "react-router-dom";
import PSearchedQuestions from "../pages/PSearchedQuestions";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { getQuestionTags } from "../apis/question";
import { IApiResponse } from "../interfaces/commons";
import { useSelector } from "react-redux";
import { set } from "../redux/slices/questionsByTagSearchSlice";
import CPopularTags from "../components/CPopularTags";

const { Content } = Layout;

const { useBreakpoint } = Grid;

const LQuestions = (): JSX.Element => {
  const controller = new AbortController();
  const screens = useBreakpoint();
  const dispatch = useDispatch<AppDispatch>();
  const { searchedTags } = useSelector(
    (state: RootState) => state.questionsByTagSearch
  );
  const [searchValue, setSearchValue] = React.useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const fetchQuestionTags = () => {
    dispatch(start());
    getQuestionTags(controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setTags(res?.data?.data);
        }
      })
      .finally(() => dispatch(stop()));
  };

  useEffect(() => {
    fetchQuestionTags();
    return () => controller.abort();
  }, []);

  return (
    <Layout>
      <CNavbar />
      <CQuestionsTopbar
        value={searchValue?.join(",") || searchedTags?.join(",")}
        setValue={(value) => {
          value
            ? setSearchValue((prev: string[]) => [...prev, value])
            : setSearchValue([]);
        }}
      />
      <Divider style={{ margin: 0 }} />
      <Content className="min-h-100 bg-white">
        <Row className="min-h-100">
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={17}
            className="d-flex flex-column layout-left-side-container"
          >
            {searchValue.length > 0 || searchedTags.length > 0 ? (
              <PSearchedQuestions
                searchByTags={searchedTags}
                searchValue={searchValue.join(",")}
              />
            ) : (
              <Outlet />
            )}
          </Col>
          {/* <Divider
            type={screens.lg ? "vertical" : "horizontal"}
            style={{
              minHeight: `${screens.lg && "100vh"}`,
              height: `${screens.lg && "100%"}`,
              display: screens.lg ? "flex" : "none",
            }}
          /> */}
          <Col xs={24} sm={24} md={24} lg={6} className="layout-tags-container">
            {tags?.length > 0 && (
              <CPopularTags
                tags={tags}
                clickHandler={(tag: string) => dispatch(set(tag))}
              />
            )}
          </Col>
        </Row>
      </Content>
      <Divider style={{ margin: 0 }} />
      <CFooter />
    </Layout>
  );
};

export default LQuestions;
