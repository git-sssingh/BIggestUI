import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteQuestionById, getQuestionsByAuthor } from "../apis/question";
import { IApiResponse } from "../interfaces/commons";
import {
  IAuthorQuestionResponse,
  IQuestionBookmarkResponse,
} from "../interfaces/question";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Button, Divider, Dropdown, List, Tag } from "antd";
import { PAGE_SIZE, ROUTES } from "../constants";
import {
  formatNumber,
  getContentExceptImages,
  getHtmlContent,
  getTimeByAgo,
} from "../utilities";
import CAvatar from "./CAvatar";
import CIconAndText from "./CIconAndText";
import {
  CircleHelpIcon,
  EllipsisIcon,
  HeartIcon,
  HeartOffIcon,
  MessageCircleMoreIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from "../utilities/icons";
import {
  CBookmarkedCount,
  CCommentsCount,
  CDelete,
  CDropdown,
  CIconButton,
  CInfiniteScroll,
  CItalicText,
  CLikeDislikeBtn,
  CPopupConfirm,
  CTags,
} from ".";
import type { MenuProps } from "antd";
import { CPopupConfirmHandle } from "../types";

const CUserAskedQuestion = () => {
  const { theme } = useSelector((state: RootState) => state.theme);
  const { Id } = useSelector((state: RootState) => state.user);
  const controller = new AbortController();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [askedQuestions, setAskedQuestions] = React.useState<
    IAuthorQuestionResponse[]
  >([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const cpopupConfirmRef = React.useRef<CPopupConfirmHandle>(null);

  const handleDeleteQuestion = useCallback(
    (questionId: string) => {
      dispatch(start());
      deleteQuestionById(questionId, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchQuestionsByAuthor(1);
            dispatch(success("Question removed successfully"));
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
    },
    [askedQuestions]
  );

  const fetchQuestionsByAuthor = (pageNumber: number) => {
    dispatch(start());
    getQuestionsByAuthor(id as string, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200 && res?.data?.data) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          if (pageNumber === 1) setAskedQuestions(res?.data?.data);
          else setAskedQuestions((prev) => [...prev, ...res?.data?.data]);
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
    return askedQuestions.map((question) => {
      return {
        id: question.id,
        href: `#${ROUTES.question}${question.id}`,
        createdDate: question.createdDate,
        title: question.title,
        description: question.description,
        content: question.description,
        tags: question.tags?.split(","),
        likes: question.upVotes,
        dislikes: question.downVotes,
        comments: question.commentsCount,
        bounty: question.bounty,
      };
    });
  }, [askedQuestions]);

  useEffect(() => {
    // fetchQuestionsByAuthor(1);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <CInfiniteScroll
      hasMore={hasMore}
      data={data}
      fetchData={fetchQuestionsByAuthor}
    >
      <List
        className="user-posted-list"
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              title={
                <CItalicText
                  children={
                    <React.Fragment>
                      Posted {getTimeByAgo(item?.createdDate)}
                    </React.Fragment>
                  }
                />
              }
              description={
                <h2>
                  <a className="title-link font-weight-700" href={item.href}>
                    {item.title}
                  </a>
                </h2>
              }
            />
            <div className="text">
              {getContentExceptImages(item.description)}
            </div>
            <div className="question-tags-container mt-3">
              <CTags tags={item?.tags || []} />
            </div>
            <div className="d-flex align-items-center mt-2">
              <CLikeDislikeBtn disabled={id === Id} likes={item.likes} />
              <CCommentsCount className="ml-1" count={item.comments} />
              {id === Id && (
                <React.Fragment>
                  <Dropdown
                    className="ml-1"
                    placement="bottomRight"
                    arrow
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: "Delete",
                          icon: (
                            <Trash2Icon height="16" className="color-danger" />
                          ),
                          onClick: () => cpopupConfirmRef.current?.open(true),
                        },
                        {
                          key: "2",
                          label: "Edit",
                          icon: <PencilIcon height="16" />,
                          onClick: () =>
                            navigate(
                              ROUTES.updateQuestion?.replace(":id", item.id),
                              {
                                state: {
                                  data: item,
                                },
                              }
                            ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button
                      style={{ borderStartEndRadius: 6, borderEndEndRadius: 6 }}
                      icon={<EllipsisIcon />}
                    />
                  </Dropdown>
                  <CPopupConfirm
                    ref={cpopupConfirmRef}
                    title="Delete"
                    description="Do you really want to delete?"
                    onConfirm={() => handleDeleteQuestion(item.id)}
                  />
                </React.Fragment>
              )}
            </div>
          </List.Item>
        )}
      />
    </CInfiniteScroll>
  );
};

export default CUserAskedQuestion;
