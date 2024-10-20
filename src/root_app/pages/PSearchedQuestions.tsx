import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuestionsBySearch, postQuestionsByTags } from "../apis/question";
import { IApiResponse } from "../interfaces/commons";
import { IQuestionResponse } from "../interfaces/question";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { AppDispatch } from "../redux/store";
import { CQuestionsList } from "../components";
import { PAGE_SIZE } from "../constants";

type PSearchedQuestionsProps = {
  searchValue: string;
  searchByTags: string[];
};

const PSearchedQuestions: React.FC<PSearchedQuestionsProps> = ({
  searchValue,
  searchByTags,
}) => {
  const controller = new AbortController();
  const [questions, setQuestions] = React.useState<IQuestionResponse[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const fetchQuestions = (pageNumber: number) => {
    dispatch(start());
    getQuestionsBySearch(searchValue, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          if (res?.data?.data) {
            if (pageNumber === 1) {
              setQuestions(res?.data?.data);
            } else {
              setQuestions((prev) => [...prev, ...res?.data?.data]);
            }
          }
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong! Please try again."
            )
          );
          setHasMore(false);
        }
      })
      .finally(() => dispatch(stop()));
  };

  const fetchQuestionsByTags = (pageNumber: number) => {
    dispatch(start());
    postQuestionsByTags(searchByTags, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          if (res?.data?.data) {
            if (pageNumber === 1) {
              setQuestions(res?.data?.data);
            } else {
              setQuestions((prev) => [...prev, ...res?.data?.data]);
            }
          }
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong! Please try again."
            )
          );
          setHasMore(false);
        }
      })
      .finally(() => dispatch(stop()));
  };

  useEffect(() => {
    searchByTags?.length > 0 && fetchQuestionsByTags(1);
    searchValue && fetchQuestions(1);
    return () => {
      controller.abort();
    };
  }, [searchValue, searchByTags]);

  return (
    <CQuestionsList
      data={questions}
      fetchQuestions={
        searchByTags?.length > 0 ? fetchQuestionsByTags : fetchQuestions
      }
      hasMore={hasMore}
    />
  );
};

export default PSearchedQuestions;
