import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  deleteAnswerById,
  postAnswer,
  putAcceptAnswer,
  putAnswerVote,
} from "../apis";
import {
  getQuestionById,
  postQuestionBookmark,
  deleteQuestionBookmark,
  postQuestionDownvote,
  postQuestionUpvote,
  getQuestionTags,
} from "../apis/question";
import { ICreateAnswerRequest, IPutAnswerVote } from "../interfaces/answer";
import { IApiResponse } from "../interfaces/commons";
import {
  IQuestionResponse,
  IPostQuestionBookmark,
} from "../interfaces/question";
import { start, stop } from "../redux/slices/loaderSlice";
import { success, error } from "../redux/slices/notificationSlice";
import { AppDispatch, RootState } from "../redux/store";
import {
  formatNumber,
  getHtmlContent,
  getTimeByAgo,
  scrollToSection,
} from "../utilities";
import {
  Col,
  Descriptions,
  DescriptionsProps,
  Divider,
  Grid,
  Layout,
  List,
  Row,
  Tag,
  Typography,
} from "antd";
import {
  CAccept,
  CAvatar,
  CButton,
  CCommentsCount,
  CDelete,
  CFooter,
  CItalicText,
  CLabelElement,
  CLikeDislikeBtn,
  CMoreActions,
  CNavbar,
  CTags,
} from "../components";
import { EDITOR_INITIAL_VALUE, ROUTES } from "../constants";
import { CheckIcon } from "../utilities/icons";
import EditorWrapper from "../components/EditorWrapper";
import { set } from "../redux/slices/questionsByTagSearchSlice";
import CPopularTags from "../components/CPopularTags";

const { Content } = Layout;

const { useBreakpoint } = Grid;

const PQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const controller = new AbortController();
  const { id } = useParams<{ id: string }>();
  const screens = useBreakpoint();
  const [answer, setAnswer] = useState<string>("");
  const navigate = useNavigate();
  const { Id } = useSelector((state: RootState) => state.user);

  const { state } = useLocation();
  const sectionId = state?.sectionId;

  const [question, setQuestion] = useState<IQuestionResponse>(
    {} as IQuestionResponse
  );
  const [tags, setTags] = useState<string[]>([]);

  const postAnswerHandler = useCallback(
    (value: string) => {
      dispatch(start());
      const data: ICreateAnswerRequest = {
        details: value,
        questionId: id as string,
      };

      postAnswer(data, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            dispatch(success("Answer posted successfully!"));
            setAnswer("");
            fetchQuestionById();
          } else {
            dispatch(
              error(
                res?.data?.message ||
                  res?.error ||
                  res?.statusText ||
                  "Something went wrong!"
              )
            );
          }
        })
        .finally(() => dispatch(stop()));
    },
    [id]
  );

  const fetchQuestionById = useCallback(() => {
    dispatch(start());
    getQuestionById(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setQuestion(res?.data?.data);
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const upVoteClickHandler = useCallback(() => {
    dispatch(start());
    postQuestionUpvote(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchQuestionById();
          dispatch(success("Question upvoted successfully"));
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const downVoteClickHandler = useCallback(() => {
    dispatch(start());
    postQuestionDownvote(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchQuestionById();
          dispatch(success("Question down-voted successfully"));
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const saveBookmarkHandler = useCallback(() => {
    dispatch(start());
    const payload: IPostQuestionBookmark = {
      questionId: id as string,
    };
    postQuestionBookmark(payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchQuestionById();
          dispatch(success("Question bookmarked successfully"));
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const unBookmarkHandler = useCallback(
    (questionId: string) => {
      dispatch(start());
      deleteQuestionBookmark(questionId, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchQuestionById();
            dispatch(success("Question un-bookmarked successfully"));
          } else {
            dispatch(
              error(res?.data?.message || res?.statusText || res?.error)
            );
          }
        })
        .finally(() => dispatch(stop()));
    },
    [id]
  );

  const voteAnswer = (like: boolean, answerId: string) => {
    dispatch(start());
    const payload: IPutAnswerVote = {
      isLike: like,
    };
    putAnswerVote(answerId, payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("Answer voted successfully"));
          fetchQuestionById && fetchQuestionById();
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.statusText ||
                res?.error ||
                "Failed to vote answer"
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };

  const deleteAnswer = useCallback(
    (answerId: string) => {
      dispatch(start());
      deleteAnswerById(answerId, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            dispatch(success("Answer deleted successfully"));
            fetchQuestionById && fetchQuestionById();
          } else {
            dispatch(
              error(
                res?.data?.message ||
                  res?.statusText ||
                  res?.error ||
                  "Failed to delete answer"
              )
            );
          }
        })
        .finally(() => dispatch(stop()));
    },
    [id]
  );

  const acceptAnswer = useCallback(
    (questionId: string, answerId: string) => {
      dispatch(start());
      putAcceptAnswer(questionId, answerId, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            dispatch(success("Answer accepted successfully"));
            fetchQuestionById && fetchQuestionById();
          } else {
            dispatch(
              error(
                res?.data?.message ||
                  res?.statusText ||
                  res?.error ||
                  "Failed to accept answer"
              )
            );
          }
        })
        .finally(() => dispatch(stop()));
    },
    [id]
  );

  const disabledPostAnswerBtn = useMemo(
    () => answer === EDITOR_INITIAL_VALUE,
    [answer]
  );

  const hideAcceptBtnIfNecessary = useMemo(
    () => question?.answers?.some((x) => x.accepted === true),
    [question]
  );

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

  const items: DescriptionsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: (
          <CItalicText
            children={
              <React.Fragment>
                Posted by{" "}
                <a href={`#${ROUTES.portfolio}${question?.author?.id}`}>
                  {question?.author?.name}
                </a>{" "}
                {getTimeByAgo(question?.createdDate)}
              </React.Fragment>
            }
          />
        ),
        children: <></>,
      },
    ],
    [question]
  );

  useEffect(() => {
    id && fetchQuestionById();
    fetchQuestionTags();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (sectionId) {
      scrollToSection(sectionId);
    }
  }, [sectionId]);

  return (
    <Layout>
      <CNavbar />
      <Descriptions
        colon={false}
        // style={{
        //   padding: "1rem 10%",
        // }}
        className="question-title-container"
        title={<h3 className="text-wrap-balance title">{question?.title}</h3>}
        items={items}
      />
      <Divider style={{ margin: 0 }} />
      <Content className="min-h-100 bg-white">
        <Row className="min-h-100">
          <Col
            xs={24}
            sm={24}
            md={18}
            className="d-flex justify-content-left flex-column question-description-container"
            style={{ borderRight: screens.md ? "1px solid #f0f0f0" : "none" }}
          >
            {getHtmlContent(question?.description)}
            <div className="ques-tags-container w-100-per d-flex justify-content-left mt-3">
              <CTags tags={question?.tags?.split(",") || []} />
            </div>

            <div className="w-100-per d-flex justify-content-left align-items-center mt-2">
              <CLikeDislikeBtn
                disabled={question?.author?.id === Id}
                likes={question.upVotes}
                onLikeBtnClick={() => upVoteClickHandler()}
                onDisLikeBtnClick={() => downVoteClickHandler()}
              />
              <CCommentsCount
                className="ml-1"
                count={question?.commentsCount}
                onClick={() => scrollToSection("answers")}
              />
              <CMoreActions
                className="ml-1"
                bookmarked={question?.bookmarkId ? true : false}
                onBookmarkClick={
                  question?.bookmarkId
                    ? () =>
                        question?.bookmarkId &&
                        unBookmarkHandler(question?.bookmarkId)
                    : () => saveBookmarkHandler()
                }
              />
            </div>

            <Divider />
            <div className="answers-container w-100-per" id="answers">
              <Typography.Title
                level={4}
                style={{ lineHeight: "0.5", marginBottom: 0 }}
              >
                Answers ({formatNumber(question?.answers?.length) || 0})
              </Typography.Title>
              <List
                className="mt-1"
                itemLayout="vertical"
                size="large"
                dataSource={question?.answers}
                renderItem={(item, index) => (
                  <List.Item
                    key={index}
                    actions={[
                      <div className="ml-6 w-100-per d-flex justify-content-left align-items-center mt-2">
                        <CLikeDislikeBtn
                          disabled={item?.givenBy?.id === Id}
                          likes={item?.voteCount}
                          onLikeBtnClick={() => voteAnswer(true, item?.id)}
                          onDisLikeBtnClick={() => voteAnswer(false, item?.id)}
                        />
                        {!hideAcceptBtnIfNecessary && (
                          <CAccept
                            className="ml-1"
                            onClick={() => acceptAnswer(question?.id, item?.id)}
                          />
                        )}
                        {item?.givenBy?.id === Id && (
                          <CDelete
                            className="ml-1"
                            onClick={() => deleteAnswer(item?.id)}
                          />
                        )}
                      </div>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<CAvatar src={item?.givenBy?.profilePic || ""} />}
                      title={
                        <a href={`#${ROUTES.portfolio}${item?.givenBy?.id}`}>
                          {item.givenBy?.name}
                          {item?.accepted && (
                            <Tag
                              icon={<CheckIcon height={15} />}
                              color="success"
                              className="d-inline-flex ml-1 align-items-center font-weight-400"
                            >
                              Accepted
                            </Tag>
                          )}
                        </a>
                      }
                      description={
                        <CItalicText
                          children={
                            <React.Fragment>
                              Posted {getTimeByAgo(item?.createdDate)}
                            </React.Fragment>
                          }
                        />
                      }
                    />
                    <div className="mt-1 ml-6">
                      {getHtmlContent(item?.details)}
                    </div>
                  </List.Item>
                )}
              />
            </div>

            <Divider />
            <div className="post-answer-container w-100-per">
              <CLabelElement
                heading="Post Your Answer"
                subHeading=""
                field={
                  <EditorWrapper
                    initialValue={answer}
                    valueSetter={setAnswer}
                  />
                }
              />

              <CButton
                disabled={disabledPostAnswerBtn}
                text="Submit"
                className="mt-1"
                type="primary"
                onClick={() => postAnswerHandler(answer)}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} className="layout-tags-container">
            {tags.length > 0 && (
              <CPopularTags
                tags={tags}
                clickHandler={(tag: string) => {
                  dispatch(set(tag));
                  navigate(ROUTES.questions);
                }}
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

export default PQuestion;
