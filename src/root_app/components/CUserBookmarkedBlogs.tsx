import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { deleteBookmarkBlog, getBookmarkedBlogs } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";
import { AppDispatch, RootState } from "../redux/store";
import { IBookmarkedBlogResponse } from "../interfaces/blogs";
import { List, Typography } from "antd";
import CAvatar from "./CAvatar";
import { ROUTES } from "../constants";
import { CDelete, CIconButton, CItalicText } from ".";
import { Trash2Icon } from "../utilities/icons";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTimeByAgo } from "../utilities";

const CUserBookmarkedBlogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<string>();
  const { Id } = useSelector((state: RootState) => state.user);
  const controller = new AbortController();
  const [savedBlogs, setSavedBlogs] = React.useState<IBookmarkedBlogResponse[]>(
    []
  );

  const fetchBookmarkedBlogs = () => {
    dispatch(start());
    getBookmarkedBlogs(controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setSavedBlogs(res?.data?.data || []);
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
    deleteBookmarkBlog(id, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          fetchBookmarkedBlogs();
          dispatch(success("Blog removed from bookmark"));
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
    return savedBlogs.map((blog) => ({
      title: blog.title,
      id: blog.id,
      bookmarkedDate: blog.bookmarkedDate,
      blogId: blog.bookmarkedWikiId,
    }));
  }, [savedBlogs]);

  useEffect(() => {
    fetchBookmarkedBlogs();
    return () => controller.abort();
  }, []);

  return (
    <List
      className="user-bookmarks-list"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={
            id === Id
              ? [<CDelete onClick={() => handleDeleteBookmark(item.id)} />]
              : []
          }
        >
          <List.Item.Meta
            title={
              <a className="font-18" href={`#${ROUTES.blog}${item.blogId}`}>
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
  );
};

export default CUserBookmarkedBlogs;
