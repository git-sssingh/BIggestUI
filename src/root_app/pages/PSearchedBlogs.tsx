import React, { useEffect } from "react";
import { CBlogsList } from "../components";
import { useDispatch } from "react-redux";
import { getBlogsBySearch, postBlogsByTags } from "../apis";
import { PAGE_SIZE } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { AppDispatch } from "../redux/store";
import { IBlogResponse } from "../interfaces/blogs";

type PSearchedBlogsProps = {
  searchValue: string;
  searchByTags: string[];
};

const PSearchedBlogs: React.FC<PSearchedBlogsProps> = ({
  searchValue,
  searchByTags,
}) => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const [blogs, setBlogs] = React.useState<IBlogResponse[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const fetchBlogsBySearch = (pageNumber: number) => {
    dispatch(start());
    getBlogsBySearch(searchValue, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          if (res?.data?.data) {
            if (pageNumber === 1) {
              setBlogs(res?.data?.data);
            } else {
              setBlogs((prev) => [...prev, ...res?.data?.data]);
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

  const fetchBlogsByTags = (pageNumber: number) => {
    dispatch(start());
    postBlogsByTags(searchByTags, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          res?.data?.data?.length < PAGE_SIZE && setHasMore(false);
          if (res?.data?.data) {
            if (pageNumber === 1) {
              setBlogs(res?.data?.data);
            } else {
              setBlogs((prev) => [...prev, ...res?.data?.data]);
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
    searchByTags?.length > 0 && fetchBlogsByTags(1);
    searchValue && fetchBlogsBySearch(1);
    return () => {
      controller.abort();
    };
  }, [searchValue, searchByTags]);

  return (
    <CBlogsList
      data={blogs}
      fetchBlogs={
        searchByTags?.length > 0 ? fetchBlogsByTags : fetchBlogsBySearch
      }
      hasMore={hasMore}
    />
  );
};

export default PSearchedBlogs;
