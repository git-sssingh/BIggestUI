import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestionBookmark,
  getBookmarkedQuestions,
} from "../apis/question";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";
import { AppDispatch, RootState } from "../redux/store";
import { IQuestionBookmarkResponse } from "../interfaces/question";
import { List, Typography } from "antd";
import { PAGE_SIZE, ROUTES } from "../constants";
import { useParams } from "react-router-dom";
import CInfiniteScroll from "./CInfiniteScroll";
import { CDelete, CItalicText } from ".";
import { getTimeByAgo } from "../utilities";

const CUserBookmarkedQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<string>();
  const { Id } = useSelector((state: RootState) => state.user);
  const controller = new AbortController();
  const [savedQuestions, setSavedQuestions] = React.useState<
    IQuestionBookmarkResponse[]
  >([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const fetchBookmarkedQuestions = (pageNumber: number) => {
    dispatch(start());
    getBookmarkedQuestions(pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200 && res?.data?.data) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          if (pageNumber === 1) {
            setSavedQuestions(res?.data?.data);
          } else {
            setSavedQuestions([...savedQuestions, ...res?.data?.data]);
          }
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong"
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };

  const handleDeleteBookmark = (id: string) => {
    dispatch(start());
    deleteQuestionBookmark(id, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchBookmarkedQuestions(1);
          dispatch(success("Question removed from bookmark"));
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong"
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };

  const data = useMemo(() => {
    return savedQuestions.map((question) => ({
      title: question.questionTitle,
      id: question.id,
      bookmarkedDate: question.createdDate,
    }));
  }, [savedQuestions]);

  useEffect(() => {
    // fetchBookmarkedQuestions(1);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <CInfiniteScroll
      hasMore={hasMore}
      data={data}
      fetchData={fetchBookmarkedQuestions}
    >
      <List
        className="portfolio-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={
              id === Id
                ? [<CDelete onClick={() => handleDeleteBookmark(item.id)} />]
                : []
            }
          >
            <List.Item.Meta
              title={
                <a className="font-18" href={`#${ROUTES.question}${item.id}`}>
                  {item.title}
                </a>
              }
              description={
                <CItalicText
                  children={
                    <React.Fragment>
                      Bookmarked {getTimeByAgo(item?.bookmarkedDate)}
                    </React.Fragment>
                  }
                />
              }
            />
          </List.Item>
        )}
      />
    </CInfiniteScroll>
  );
};

export default CUserBookmarkedQuestions;
