import React, { memo } from "react";
import { CBlogFormWrapper } from "../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { IPostBlog, IUpdateBlogRequest } from "../interfaces/blogs";
import { putBlogById } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error, success } from "../redux/slices/notificationSlice";
import { useLocation } from "react-router-dom";

const PUpdateBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const controller = new AbortController();
  const { state } = useLocation();

  const handleSubmitButton = (data: IUpdateBlogRequest) => {
    if (data?.tags?.length === 0) {
      dispatch(error("Please add tags"));
      return;
    }

    if (data?.tags?.split(",")?.length > 7) {
      dispatch(error("You can add maximum 7 tags"));
      return;
    }

    dispatch(start());
    const payload: IPostBlog = {
      title: data?.title,
      description: data?.description,
      tags: data?.tags,
    };
    putBlogById(state?.data?.id, payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("Blog updated successfully"));
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

  return <CBlogFormWrapper publishClickHandler={handleSubmitButton} />;
};

export default memo(PUpdateBlog);
