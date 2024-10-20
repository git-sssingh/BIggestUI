import React, { memo, useState } from "react";
import EditorWrapper from "../components/EditorWrapper";
import {
  CBlogFormWrapper,
  CButton,
  CLabelElement,
  CTextField,
} from "../components";
import CTagField from "../components/CTagField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { ICreateBlogRequest, IPostBlog } from "../interfaces/blogs";
import { postBlog } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error, success } from "../redux/slices/notificationSlice";

type PWriteBlogStepsProps = {
  setSteps: (value: number) => void;
  valueSetter: (value: string) => void;
};

type PWriteBlogStep2Props = {
  setBlogTitle: (value: string) => void;
  blogTags: string[];
  setBlogTags: (value: string[]) => void;
};

const PWriteBlog_Step_2 = memo(
  ({ setBlogTitle, blogTags, setBlogTags }: PWriteBlogStep2Props) => {
    return (
      <React.Fragment>
        <CLabelElement
          heading="Choose a title for your story"
          subHeading="Summarize your story in signle line title."
          field={
            <CTextField
              classes="mt-1"
              size="large"
              label={""}
              fieldProps={{
                textFieldProps: {
                  name: "title",
                  placeholder: "e.g. How to install node.js?",
                  type: "text",
                  onBlur: (e) => setBlogTitle(e.target.value),
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input title of your story!",
                },
                {
                  min: 30,
                  message: "Title should be minimum of 30 characters",
                },
              ]}
            />
          }
        />
        <CLabelElement
          heading="Tags"
          subHeading="Add up to 7 tags to describe what your story is about."
          field={<CTagField tags={blogTags} setTags={setBlogTags} />}
        />
      </React.Fragment>
    );
  }
);

const PWriteBlog_Step_1 = memo(
  ({ setSteps, valueSetter }: PWriteBlogStepsProps) => {
    const [description, setDescription] = useState<string>("");
    return (
      <React.Fragment>
        <div className="d-flex justify-content-right mb-1 align-items-center">
          <CButton
            disabled={description === "" || description.length < 150}
            type="primary"
            text="Next"
            onClick={() => {
              valueSetter(description);
              setSteps(2);
            }}
          />
        </div>
        <EditorWrapper valueSetter={setDescription} className="min-h-100" />
      </React.Fragment>
    );
  }
);

const PWriteBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const controller = new AbortController();

  const handleSubmitButton = (data: ICreateBlogRequest) => {
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
    postBlog(payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("Blog published successfully"));
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

export default memo(PWriteBlog);
