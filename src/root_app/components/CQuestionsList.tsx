import { List, Tag } from "antd";
import React, { memo, useMemo } from "react";
import { ROUTES } from "../constants";
import { getContentExceptImages, getTimeByAgo } from "../utilities";
import {
  CCommentsCount,
  CInfiniteScroll,
  CItalicText,
  CLikeDislikeBtn,
  CTags,
} from ".";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { postQuestionUpvote, postQuestionDownvote } from "../apis/question";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { success, error } from "../redux/slices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { IQuestionResponse } from "../interfaces/question";

type CQuestionsListProps = {
  data: IQuestionResponse[];
  fetchQuestions: (pageNumber: number) => void;
  hasMore: boolean;
};

const CQuestionsList: React.FC<CQuestionsListProps> = ({
  data,
  fetchQuestions,
  hasMore,
}) => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { Id } = useSelector((state: RootState) => state.user);

  const upVoteClickHandler = (questionId: string) => {
    dispatch(start());
    postQuestionUpvote(questionId as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchQuestions(1);
          dispatch(success("Question upvoted successfully"));
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  };

  const downVoteClickHandler = (questionId: string) => {
    dispatch(start());
    postQuestionDownvote(questionId as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchQuestions(1);
          dispatch(success("Question down-voted successfully"));
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  };

  const processedData = useMemo(() => {
    return data?.map((item: IQuestionResponse) => {
      return {
        id: item.id,
        href: `#${ROUTES.question}${item.id}`,
        authorName: item.author.name,
        createdDate: item.createdDate,
        authorId: item.author.id,
        title: item.title,
        avatar: item.author.profilePic || item.author.name || "",
        description: item.description,
        content: item.description,
        tags: item?.tags,
        points: item.points,
        comments: item.totalAnswerGived,
        authorProfile: `#${ROUTES.portfolio}${item.author.id}`,
      };
    });
  }, [data]);

  return (
    <CInfiniteScroll
      hasMore={hasMore}
      data={processedData}
      fetchData={fetchQuestions}
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={processedData}
        renderItem={(item: any, index: number) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={
                <a
                  className="title-link font-20 font-weight-700 title"
                  href={item.href}
                >
                  {item.title}
                </a>
              }
              description={
                <CItalicText
                  children={
                    <React.Fragment>
                      Posted by{" "}
                      <a href={`#${ROUTES.portfolio}${item.authorId}`}>
                        {item?.authorName}
                      </a>{" "}
                      {getTimeByAgo(item?.createdDate)}
                    </React.Fragment>
                  }
                />
              }
            />
            <div className="text mt-2">
              {getContentExceptImages(item.description) || "No Description"}
            </div>
            <div className="question-tags-container mt-3">
              <CTags tags={item?.tags?.split(",") || []} />
            </div>
            <div className="d-flex align-items-center mt-2">
              <CLikeDislikeBtn
                disabled={item?.authorId === Id}
                likes={item.likes}
                onLikeBtnClick={() => upVoteClickHandler(item?.id)}
                onDisLikeBtnClick={() => downVoteClickHandler(item?.id)}
              />
              <CCommentsCount
                className="ml-1"
                count={item?.comments}
                onClick={() =>
                  navigate(`${ROUTES.question}${item?.id}`, {
                    state: { id: item?.id, sectionId: "answers" },
                  })
                }
              />
            </div>
          </List.Item>
        )}
      />
    </CInfiniteScroll>
  );
};

export default memo(CQuestionsList);
