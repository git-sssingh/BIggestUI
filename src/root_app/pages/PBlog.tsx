import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteBlogById,
  deleteBookmarkBlog,
  getBlogById,
  postBlogDownvoteById,
  postBlogUpvoteById,
  postBookmarkBlog,
} from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { success, error } from "../redux/slices/notificationSlice";
import { AppDispatch, RootState } from "../redux/store";
import { formatNumber, getHtmlContent, getTimeByAgo } from "../utilities";
import { Divider, Grid, Layout, List, Typography } from "antd";
import {
  CAvatar,
  CFooter,
  CItalicText,
  CLikeDislikeBtn,
  CMoreActions,
  CNavbar,
  CTags,
} from "../components";
import { ROUTES } from "../constants";
import { IBlogResponse, IBookMarkBlog } from "../interfaces/blogs";
import React from "react";
import { useSelector } from "react-redux";

const { Content } = Layout;

const { useBreakpoint } = Grid;

const PBlog = () => {
  const { id } = useParams<{ id: string }>();
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const screens = useBreakpoint();
  const [blog, setBlog] = useState<IBlogResponse>({} as IBlogResponse);
  const { Id } = useSelector((state: RootState) => state.user);

  const fetchBlog = useCallback(() => {
    dispatch(start());
    getBlogById(id as string, controller.signal)
      .then((res) => {
        if (res?.status === 200) {
          setBlog(res?.data?.data);
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong! Please try again."
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const likeClickHandler = useCallback(() => {
    dispatch(start());
    postBlogUpvoteById(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setBlog((prev: IBlogResponse) => ({
            ...prev,
            upvotes: prev.upvotes + 1,
          }));
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong! Please try again."
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const disLikeClickHandler = useCallback(() => {
    dispatch(start());
    postBlogDownvoteById(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setBlog((prev: IBlogResponse) => ({
            ...prev,
            downvotes: prev.downvotes + 1,
          }));
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong! Please try again."
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const addBookMarkHandler = useCallback(() => {
    dispatch(start());
    const payload: IBookMarkBlog = {
      wikiId: id as string,
    };
    postBookmarkBlog(payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchBlog();
          dispatch(success("Bookmark added successfully!"));
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong! Please try again."
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  }, [id]);

  const removeBookMarkHandler = useCallback(
    (bookmarkedId: string) => {
      dispatch(start());
      deleteBookmarkBlog(bookmarkedId, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchBlog();
            dispatch(success("Bookmark removed successfully!"));
          } else {
            dispatch(
              error(
                res?.data?.message ||
                  res?.error ||
                  res?.statusText ||
                  "Something went wrong! Please try again."
              )
            );
          }
        })
        .finally(() => dispatch(stop()));
    },
    [id]
  );

  const topBarData = useMemo(() => {
    return [
      {
        authorName: blog?.author?.name,
        authorId: blog?.author?.authorId,
        createdDate: blog?.createdDate,
        profilePic: blog?.author?.name || "",
      },
    ];
  }, [blog]);

  useEffect(() => {
    id && fetchBlog();
    return () => {
      controller.abort();
    };
  }, [id]);
  return (
    <Layout>
      <CNavbar />
      <List
        className="blog-container mt-8"
        style={{
          padding: screens.lg ? "5px 15%" : "5px 5.5%",
        }}
        itemLayout="horizontal"
        dataSource={topBarData}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <CAvatar src={item.profilePic} height="50px" width="50px" />
              }
              title={
                <a
                  href={`#${ROUTES.portfolio}${item.authorId}`}
                  className="title"
                >
                  {item.authorName}
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
          </List.Item>
        )}
      />
      <Divider style={{ margin: 0 }} />
      <Content
        className="min-h-100 bg-white blog-container-content"
        style={{ padding: screens.lg ? "0rem 15%" : "0rem 5.5%" }}
      >
        <Typography.Title level={2} className="title">
          {blog?.title}
        </Typography.Title>
        <Divider style={{ margin: "12px 0" }} />
        <div className="question-actions-btn-container w-100-per mt-3 d-flex justify-content-space-between">
          <CLikeDislikeBtn
            disabled={blog?.author?.authorId === Id}
            likes={blog?.upvotes}
            onLikeBtnClick={likeClickHandler}
            onDisLikeBtnClick={disLikeClickHandler}
          />
          <CMoreActions
            bookmarked={blog?.bookmarkId ? true : false}
            onBookmarkClick={
              blog?.bookmarkId
                ? () =>
                    blog?.bookmarkId && removeBookMarkHandler(blog?.bookmarkId)
                : () => addBookMarkHandler()
            }
          />
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div className="font-20">{getHtmlContent(blog?.description)}</div>
        <div className=" ques-tags-container w-100-per d-flex justify-content-left mt-3 mb-3">
          <CTags tags={blog?.tags?.split(",") || []} />
        </div>
      </Content>
      <Divider style={{ margin: 0 }} />
      <CFooter />
    </Layout>
  );
};

export default PBlog;
