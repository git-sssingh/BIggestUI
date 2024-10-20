import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuestionsByCompanyId, getQuestionsByTeam } from "../apis/question";
import { IApiResponse } from "../interfaces/commons";
import { IQuestionResponse } from "../interfaces/question";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { RootState, AppDispatch } from "../redux/store";
import { CQuestionsList } from "../components";
import { PAGE_SIZE } from "../constants";

const PQuestions = () => {
  const controller = new AbortController();

  const [questions, setQuestions] = React.useState<IQuestionResponse[]>([]);

  const { CompanyId } = useSelector((state: RootState) => state.user);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const { id } = useParams<string>();

  const fetchQuestions = (pageNumber: number) => {
    dispatch(start());
    getQuestionsByCompanyId(CompanyId as string, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          setQuestions((prev) => [...prev, ...res?.data?.data]);
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

  const fetchQuestionsByTeam = (pageNumber: number) => {
    dispatch(start());
    getQuestionsByTeam(id as string, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          setQuestions((prev) => [...prev, ...res?.data?.data]);
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
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <CQuestionsList
      data={questions}
      fetchQuestions={
        pathname?.includes("/team") && id
          ? fetchQuestionsByTeam
          : fetchQuestions
      }
      hasMore={hasMore}
    />
  );
};

export default PQuestions;
