import {
  Alert,
  Typography,
  Grid,
  Divider,
  Space,
  List,
  Avatar,
  Tag,
} from "antd";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getBlogsByCompanyId,
  deleteBlogById,
  deleteBookmarkBlog,
  postBlogDownvoteById,
  postBlogUpvoteById,
  postBookmarkBlog,
} from "../apis";
import { PAGE_SIZE, ROUTES } from "../constants";
import { IBlogResponse, IBookMarkBlog } from "../interfaces/blogs";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  getTemplateImage,
  getContentExceptImages,
  getHtmlContent,
} from "../utilities";
import {
  CAvatar,
  CBlogsList,
  CButton,
  CIconAndText,
  CIconButton,
} from "../components";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  HeartIcon,
  HeartOffIcon,
  MessageCircleMoreIcon,
  PlusIcon,
  Share2Icon,
} from "../utilities/icons";
import DefaultThumbNailImage from "../assets/banner.jpg";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const PBlogs = () => {
  const { CompanyId, Id } = useSelector((state: RootState) => state.user);
  const { theme } = useSelector((state: RootState) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const controller = new AbortController();
  const [blogs, setBlogs] = React.useState<IBlogResponse[]>([]);
  const screens = Grid.useBreakpoint();
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  const getBlogs = (pageNumber: number) => {
    dispatch(start());
    getBlogsByCompanyId(CompanyId, pageNumber, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200 || res?.status === 404) {
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
    return () => {
      controller.abort();
    };
  }, []);

  return <CBlogsList data={blogs} fetchBlogs={getBlogs} hasMore={hasMore} />;
};

export default PBlogs;
