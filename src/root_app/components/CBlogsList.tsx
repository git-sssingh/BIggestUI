import React, { useCallback, useMemo } from "react";
import CInfiniteScroll from "./CInfiniteScroll";
import { IBlogResponse, IBookMarkBlog } from "../interfaces/blogs";
import { List, Divider, Tag, Grid, Radio } from "antd";
import {
  postBlogUpvoteById,
  postBlogDownvoteById,
  postBookmarkBlog,
  deleteBookmarkBlog,
} from "../apis";
import { ROUTES } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { success, error } from "../redux/slices/notificationSlice";
import {
  getTemplateImage,
  getHtmlContent,
  formatNumber,
  getContentExceptImages,
  getTimeByAgo,
} from "../utilities";
import CAvatar from "./CAvatar";
import CIconAndText from "./CIconAndText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import DefaultThumbNailImage from "../assets/banner.jpg";
import DefalutBlogImage from "../assets/blog-default-image.png";
import CLikeDislikeBtn from "./CLikeDislikeBtn";
import { CCommentsCount, CItalicText, CMoreActions, CTags } from ".";

type CBlogsListProps = {
  data: IBlogResponse[];
  fetchBlogs: (pageNumber: number) => void;
  hasMore: boolean;
};

const CBlogsList: React.FC<CBlogsListProps> = ({
  data,
  fetchBlogs,
  hasMore,
}) => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const screens = Grid.useBreakpoint();
  const { Id } = useSelector((state: RootState) => state.user);

  const likeClickHandler = useCallback(
    (blogId: string) => {
      dispatch(start());
      postBlogUpvoteById(blogId as string, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchBlogs(1);
            dispatch(success("Blog upvoted successfully"));
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
    [data]
  );

  const disLikeClickHandler = useCallback(
    (blogId: string) => {
      dispatch(start());
      postBlogDownvoteById(blogId as string, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchBlogs(1);
            dispatch(success("Blog down-voted successfully"));
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
    [data]
  );

  const addBookMarkHandler = useCallback(
    (blogId: string) => {
      dispatch(start());
      const payload: IBookMarkBlog = {
        wikiId: blogId,
      };
      postBookmarkBlog(payload, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchBlogs(1);
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
    },
    [data]
  );

  const removeBookMarkHandler = useCallback(
    (bookmarkedId: string) => {
      dispatch(start());
      deleteBookmarkBlog(bookmarkedId, controller.signal)
        .then((res: IApiResponse) => {
          if (res?.status === 200) {
            fetchBlogs(1);
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
    [data]
  );

  const processedData = useMemo(() => {
    return data?.map((blog: IBlogResponse) => {
      return {
        id: blog.id,
        href: `#${ROUTES.blog}${blog.id}`,
        authorName: blog.author?.name || "",
        createdDate: blog.createdDate,
        authorId: blog.author?.authorId || "",
        title: blog.title,
        avatar: blog.author?.name || "",
        description: blog.description,
        content: blog.description,
        tags: blog.tags?.split(","),
        likes: blog.upvotes,
        dislikes: blog.downvotes,
        authorProfile: `#${ROUTES.portfolio}${blog.author?.authorId}`,
        bookmarkedId: blog.bookmarkId || "",
      };
    });
  }, [data]);

  return (
    <CInfiniteScroll
      hasMore={hasMore}
      data={processedData}
      fetchData={fetchBlogs}
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={processedData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              (screens.md || screens.lg) && (
                <img
                  width={200}
                  height="70%"
                  alt="logo"
                  src={getTemplateImage(item?.content) || DefalutBlogImage}
                />
              )
            }
          >
            <List.Item.Meta
              title={
                <a
                  className="title-link font-20 font-weight-700"
                  href={item.href}
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              }
              description={
                <CItalicText
                  children={
                    <React.Fragment>
                      Written by{" "}
                      <a href={`#${ROUTES.portfolio}${item.authorId}`}>
                        {item?.authorName}
                      </a>{" "}
                      {getTimeByAgo(item?.createdDate)}
                    </React.Fragment>
                  }
                />
              }
            />
            <div className="text mt-1">
              {getContentExceptImages(item.description)} || "No Content"
            </div>
            <div className="blog-tags-container mt-3">
              <CTags tags={item.tags || []} />
            </div>
            <div className="d-flex align-items-center mt-2">
              <CLikeDislikeBtn
                disabled={item?.authorId === Id}
                likes={item.likes}
                onLikeBtnClick={() => likeClickHandler(item?.id)}
                onDisLikeBtnClick={() => disLikeClickHandler(item?.id)}
              />
              <CMoreActions
                className="ml-1"
                bookmarked={item?.bookmarkedId ? true : false}
                onBookmarkClick={
                  item?.bookmarkedId
                    ? () => removeBookMarkHandler(item?.bookmarkedId)
                    : () => addBookMarkHandler(item?.id)
                }
              />
            </div>
          </List.Item>
        )}
      />
    </CInfiniteScroll>
  );
};

export default CBlogsList;
