import { Form, Space, Typography } from "antd";
import form from "antd/es/form";
import React, { useEffect, useState } from "react";
import { CTextField, CLink, CSubmitButton, CLabelElement } from "../components";
import { ROUTES } from "../constants";
import {
  ICreateQuestionRequest,
  IPostQuestion,
  IPutQuestion,
} from "../interfaces/question";
import { postQuestion, putQuestionById } from "../apis/question";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import EditorWrapper from "../components/EditorWrapper";
import CTagField from "../components/CTagField";
import { success, error } from "../redux/slices/notificationSlice";
import { useLocation } from "react-router-dom";

const PUpdateQuestion = () => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<IPutQuestion>();
  const [questionDescription, setQuestionDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const { state } = useLocation();

  const onFinish = (data: IPutQuestion) => {
    if (questionDescription.length < 150) {
      dispatch(error("Description must be minimum 150 characters"));
      return;
    }

    if (tags.length === 0) {
      dispatch(error("Please add tags"));
      return;
    }

    if (tags.length > 7) {
      dispatch(error("You can add maximum 7 tags"));
      return;
    }

    dispatch(start());
    data = { ...data, tags: tags?.join(","), description: questionDescription };
    putQuestionById(state?.data?.id, data, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("Question updated successfully"));
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

  useEffect(() => {
    if (state?.data) {
      console.log(state?.data);
      setQuestionDescription(state?.data?.description || "");
      setTags(state?.data?.tags || []);
    }
  }, [state]);

  return (
    <div>
      <Typography.Title level={2}>Update your Question</Typography.Title>
      <Form
        form={form}
        name="login"
        layout="vertical"
        initialValues={{
          remember: true,
          title: state?.data?.title,
          bounty: state?.data?.bounty,
        }}
        onFinish={onFinish}
      >
        <CLabelElement
          heading="Title"
          subHeading="Summarize your problem in a one-line title."
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
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input title of your question!",
                },
                {
                  min: 30,
                  message: "Title must be minimum 30 characters",
                },
              ]}
            />
          }
        />

        <CLabelElement
          heading="Describe your question"
          subHeading="Describe your problem in more detail by including what you've tried and what you're looking for."
          field={
            <EditorWrapper
              initialValue={state?.data?.description || ""}
              valueSetter={setQuestionDescription}
            />
          }
        />
        <CLabelElement
          heading="Tags"
          subHeading="Add up to 7 tags to describe what your question is about."
          field={<CTagField tags={tags} setTags={setTags} />}
        />

        <CLabelElement
          heading="Bounty"
          subHeading="Offer a bounty to draw attention to your question."
          field={
            <CTextField
              classes="mt-1"
              size="large"
              label={""}
              fieldProps={{
                textFieldProps: {
                  name: "bounty",
                  placeholder: "e.g. 50",
                  type: "number",
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input bounty of your question!",
                },
              ]}
            />
          }
        />

        <Form.Item className="mt-2">
          <CSubmitButton fullWidth={false} form={form}>
            Submit
          </CSubmitButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PUpdateQuestion;
