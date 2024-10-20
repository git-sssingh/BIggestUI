import { Typography, Form, Row, Col } from "antd";
import React, { useEffect } from "react";
import {
  CItalicText,
  CTextField,
  CTextArea,
  CSubmitButton,
} from "../components";
import { IIssueRequest } from "../interfaces/issues";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { postIssue } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error, success } from "../redux/slices/notificationSlice";
import { start, stop } from "../redux/slices/loaderSlice";

const PReportAnIssue = () => {
  const [form] = Form.useForm<IIssueRequest>();
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (data: IIssueRequest) => {
    dispatch(start());
    postIssue(data, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("Issue reported successfully"));
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
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <Typography.Title level={3}>Report an Issue</Typography.Title>
      <CItalicText
        children={
          "Please fill the below form with as much details as possible."
        }
      />
      <Form
        form={form}
        name="report an issue"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="mt-4"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <CTextField
              size="large"
              label="Name"
              fieldProps={{
                textFieldProps: {
                  name: "name",
                  placeholder: "John Doe",
                  type: "text",
                },
              }}
              rules={[{ required: true, message: "Please input your Name!" }]}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CTextField
              size="large"
              label="Email Id"
              fieldProps={{
                textFieldProps: {
                  name: "emailId",
                  placeholder: "xyz@gmail.com",
                  type: "email",
                },
              }}
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24}>
            <CTextField
              size="large"
              label="Title of the issue"
              fieldProps={{
                textFieldProps: {
                  name: "title",
                  placeholder: "Issue Title",
                  type: "text",
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input title of your issue!",
                },
                {
                  min: 30,
                  max: 250,
                  message:
                    "Title length should be greater than 30 and less than 250 characters",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <CTextArea
              label="Description"
              fieldProps={{
                textAreaProps: {
                  name: "description",
                  placeholder: "Describe your issue",
                  showCount: true,
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input description!",
                },
                {
                  min: 50,
                  message: "Description should be minimum of 50 characters",
                },
              ]}
            />
          </Col>
        </Row>

        <Form.Item className="mt-2 d-flex align-items-center">
          <CSubmitButton form={form}>Submit</CSubmitButton>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default PReportAnIssue;
