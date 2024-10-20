import { Col, Form, Row, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { ISignup } from "../interfaces/user";
import {
  CButton,
  CLink,
  CLogo,
  CSubmitButton,
  CTextArea,
  CTextField,
} from "../components";
import { ROUTES } from "../constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { postCreateUser } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";
import { useNavigate, useParams } from "react-router-dom";

const PSignup: React.FC = (): React.ReactNode => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm<ISignup>();
  const { id } = useParams<string>();

  const onFinish = (data: ISignup) => {
    dispatch(start());
    data = { ...data, companyId: id as string };
    postCreateUser(data, controller.signal)
      .then((res: IApiResponse) => {
        res?.status === 200
          ? dispatch(success("Employee Added Successfully"))
          : dispatch(error(res?.statusText || res?.error));
      })
      .finally(() => {
        dispatch(stop());
      });
  };

  // useEffect(() => {
  //   console.log("id", id);
  //   id && form.setFieldsValue({ companyId: id });
  // }, [id]);

  return (
    <Space className="xs-signup-form-container sm-signup-form-container signup-form-container d-flex flex-column justify-content-center align-items-center m-3">
      <Form
        form={form}
        name="signup"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-100-per mt-2"
      >
        <CTextField
          label="User Id"
          size="large"
          fieldProps={{
            textFieldProps: {
              name: "userId",
              placeholder: "",
              type: "text",
            },
          }}
          rules={[{ required: true, message: "Please input your User Id!" }]}
        />
        <CTextField
          label="Name"
          size="large"
          fieldProps={{
            textFieldProps: {
              name: "name",
              placeholder: "John Doe",
              type: "text",
            },
          }}
          rules={[{ required: true, message: "Please input your Name!" }]}
        />
        <CTextField
          label="Email Id"
          size="large"
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
        <CTextField
          label="Contact Number"
          size="large"
          fieldProps={{
            textFieldProps: {
              name: "contactNumber",
              placeholder: "1234567890",
              type: "text",
            },
          }}
          rules={[
            {
              required: true,
              message: "Please input your Contact Number!",
            },
          ]}
        />
        <CTextField
          label="Password"
          size="large"
          fieldProps={{
            textFieldProps: {
              name: "password",
              placeholder: "xyz@123",
              type: "password",
            },
          }}
          rules={[{ required: true, message: "Please input your Password!" }]}
        />
        <Form.Item>
          <CSubmitButton
            className="mt-2"
            size="large"
            fullWidth={true}
            form={form}
          >
            Join Us
          </CSubmitButton>
        </Form.Item>
        <div className="d-block text-center mt-1">
          Already have accrount? &nbsp;
          <CLink path={ROUTES.signIn} children="Sign In" />
        </div>
      </Form>
    </Space>
  );
};

export default PSignup;
