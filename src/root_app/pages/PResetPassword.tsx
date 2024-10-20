import { Col, Form, Row, Space, Typography } from "antd";
import React from "react";
import { IForgetPassword, IResetPassword } from "../interfaces/user";
import { CSubmitButton, CTextField } from "../components";
import { ROUTES } from "../constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { postForgotPassword, postSignIn, putResetPassword } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { useNavigate } from "react-router-dom";

const PResetPassword: React.FC = (): React.ReactNode => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm<IResetPassword>();

  const onFinish = (data: IResetPassword) => {
    dispatch(start());
    putResetPassword(data, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          if (res?.data?.data === true) {
            dispatch(error("Password reset successfully!"));
            navigate(ROUTES.signIn);
          } else {
            dispatch(error("Something went wrong! Please try again."));
          }
        } else {
          dispatch(error(res?.statusText || res?.error));
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
        Reset Password
      </Typography.Title>
      <Form
        form={form}
        name="Reset Password"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24}>
            <CTextField
              label="Password"
              fieldProps={{
                textFieldProps: {
                  type: "password",
                  name: "password",
                  placeholder: "xyz@123",
                },
              }}
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            />
          </Col>
        </Row>

        <Form.Item className="mt-1">
          <CSubmitButton form={form}>Reset Password</CSubmitButton>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default PResetPassword;
