import React, { useState } from "react";
import { ICreateSubscription } from "../interfaces/subscription";
import { Form, Grid, Typography, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CItalicText,
  CTextField,
  CTextArea,
  CSubmitButton,
  CCheckbox,
} from "../components";
import { AppDispatch } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { createSubscription } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error, success } from "../redux/slices/notificationSlice";

const PAddSubscription = () => {
  const controller = new AbortController();
  const [form] = Form.useForm<ICreateSubscription>();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (data: ICreateSubscription) => {
    dispatch(start());
    const payload: ICreateSubscription = {
      ...data,
      plan: {
        canSeeReport: data?.plan?.canSeeReport,
        noOfQuestionsPost: Number(data?.plan?.noOfQuestionsPost),
        noOfTeamsCreate: Number(data?.plan?.noOfTeamsCreate),
        noOfUsers: Number(data?.plan?.noOfUsers),
        noOfWikisPost: Number(data?.plan?.noOfWikisPost),
      },
      amount: Number(data?.amount),
      validDay: Number(data?.validDay),
    };
    createSubscription(payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("Subscription created successfully."));
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.status ||
                res?.error ||
                "Something went wrong!"
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };
  return (
    <div className="ask-layout-container">
      <React.Fragment>
        <Typography.Title level={3}>Create Subscription</Typography.Title>
        <CItalicText children={"Fill the form below to create subscription."} />
        <Form
          form={form}
          name="create subscription"
          layout="vertical"
          initialValues={{ remember: true, plan: { canSeeReport: false } }}
          onFinish={onFinish}
          className="mt-4"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="Title"
                fieldProps={{
                  textFieldProps: {
                    name: "title",
                    placeholder: "Enter title",
                    type: "text",
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input title!",
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="Amount"
                fieldProps={{
                  textFieldProps: {
                    name: "amount",
                    placeholder: "Enter amount",
                    type: "number",
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input amount!",
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="Valid Days"
                fieldProps={{
                  textFieldProps: {
                    name: "validDay",
                    placeholder: "Enter valid days",
                    type: "number",
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input valid days!",
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="Description"
                fieldProps={{
                  textFieldProps: {
                    name: "description",
                    placeholder: "Enter description",
                    type: "text",
                  },
                }}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Typography.Text>What's Included?</Typography.Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-1">
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="No of Users allowed"
                name={["plan", "noOfUsers"]}
                fieldProps={{
                  textFieldProps: {
                    placeholder: "10",
                    type: "number",
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input No of users allowed!",
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="No of teams allowed"
                name={["plan", "noOfTeamsCreate"]}
                fieldProps={{
                  textFieldProps: {
                    placeholder: "10",
                    type: "number",
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input No of team allowed!",
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-1">
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="No of Questions allowed"
                name={["plan", "noOfQuestionsPost"]}
                fieldProps={{
                  textFieldProps: {
                    placeholder: "10",
                    type: "number",
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input No of questions allowed!",
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <CTextField
                label="No of wikis allowed"
                name={["plan", "noOfWikisPost"]}
                fieldProps={{
                  textFieldProps: {
                    placeholder: "10",
                    type: "number",
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input No of wikis allowed!",
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-1">
            <Col xs={24} sm={24} md={12}>
              <CCheckbox
                label="Can see report?"
                name={["plan", "canSeeReport"]}
                fieldProps={{
                  checkboxFieldProps: {
                    checked: false,
                  },
                }}
              />
            </Col>
          </Row>

          <Form.Item className="mt-2 d-flex align-items-center">
            <CSubmitButton form={form}>Submit</CSubmitButton>
          </Form.Item>
        </Form>
      </React.Fragment>
    </div>
  );
};

export default PAddSubscription;
