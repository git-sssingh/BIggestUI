import { Col, Divider, Grid, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { CBlogsTopbar, CFooter, CNavbar } from "../components";
import { Outlet } from "react-router-dom";
import PSearchedBlogs from "../pages/PSearchedBlogs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { set } from "../redux/slices/blogsByTagSearchSlice";
import { start } from "../redux/slices/loaderSlice";
import { getBlogTags } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import CPopularTags from "../components/CPopularTags";

const { Content } = Layout;

const { useBreakpoint } = Grid;

const LBlogs = (): JSX.Element => {
  const controller = new AbortController();
  const screens = useBreakpoint();
  const dispatch = useDispatch<AppDispatch>();
  const { searchedTags } = useSelector(
    (state: RootState) => state.blogsByTagSearch
  );
  const [searchValue, setSearchValue] = React.useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const fetchBlogTags = () => {
    dispatch(start());
    getBlogTags(controller.signal).then((res: IApiResponse) => {
      if (res?.status === 200) {
        setTags(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    fetchBlogTags();

    return () => controller.abort();
  }, []);

  return (
    <Layout>
      <CNavbar />
      <CBlogsTopbar
        value={searchValue?.join(",") || searchedTags?.join(",")}
        setValue={(value) =>
          value
            ? setSearchValue((prev: string[]) => [...prev, value])
            : setSearchValue([])
        }
      />
      <Divider style={{ margin: 0 }} />
      <Content className="min-h-100 bg-white">
        <Row className="min-h-100">
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={17}
            className="d-flex flex-column align-items-center layout-left-side-container"
          >
            {searchValue?.length > 0 || searchedTags?.length > 0 ? (
              <PSearchedBlogs
                searchByTags={searchedTags}
                searchValue={searchValue?.join(",")}
              />
            ) : (
              <Outlet />
            )}
          </Col>
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

export default LBlogs;
