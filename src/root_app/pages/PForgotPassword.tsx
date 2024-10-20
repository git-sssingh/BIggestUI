import { Col, Form, Row, Space, Typography } from "antd";
import React from "react";
import { IForgetPassword } from "../interfaces/user";
import { CSubmitButton, CTextField } from "../components";
import { ROUTES } from "../constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { postForgotPassword, postSignIn } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { useNavigate } from "react-router-dom";

const PForgotPassword: React.FC = (): React.ReactNode => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm<IForgetPassword>();

  const onFinish = (data: IForgetPassword) => {
    dispatch(start());
    postForgotPassword(data, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          const code = res?.data?.data;
          if (!code) {
            dispatch(error("Something went wrong! Please try again."));
          } else {
            navigate(`${ROUTES.resetPassword}${code}`);
          }
        } else {
          dispatch(error(res?.data?.message || res?.statusText || res?.error));
        }
      })
      .finally(() => dispatch(stop()));
  };

  return (
    <Space className="forgot-password-form-container d-flex flex-column justify-content-center align-items-center m-3">
      <Typography.Title
        level={4}
        className="text-center font-weight-600 login-heading"
      >
        Forgot Password
      </Typography.Title>
      <Form
        form={form}
        name="forgot password"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24}>
            <CTextField
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

        <Form.Item className="mt-1">
          <CSubmitButton form={form}>Forgot Password</CSubmitButton>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default PForgotPassword;
