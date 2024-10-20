import { Button, Checkbox, Divider, Flex, Form, Space, Typography } from "antd";
import React from "react";
import { IAuthentication, ISignIn } from "../interfaces/user";
import {
  CCheckbox,
  CLink,
  CLogo,
  CSubmitButton,
  CTextField,
} from "../components";
import { ROUTES } from "../constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { postSignIn } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { saveAuth } from "../redux/slices/authSlice";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { save } from "../redux/slices/userSlice";
import {
  setAuthLocalStorage,
  getLastVisitedUrlLocalStorage,
} from "../storage/local";
import { DecodeTokenType } from "../types";
import { decodeToken } from "../utilities";
import { useNavigate } from "react-router-dom";
import { removeLoginCookie, setLoginCookie } from "../storage/cookies";

interface IFormData extends ISignIn {
  rememberMe: boolean;
}

const PSignin: React.FC = (): React.ReactNode => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form] = Form.useForm<IFormData>();

  const onFinish = (data: IFormData) => {
    dispatch(start());
    const payload: ISignIn = {
      emailId: data.emailId,
      password: data.password,
    };

    Boolean(data.rememberMe) ? setLoginCookie(payload) : removeLoginCookie();

    postSignIn(payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200 && res?.data?.data) {
          const responseData = res?.data?.data as IAuthentication;
          dispatch(saveAuth(responseData));
          setAuthLocalStorage(responseData);
          const decodedToken: DecodeTokenType = decodeToken<DecodeTokenType>(
            responseData?.accessToken
          );
          if (decodedToken) {
            dispatch(save(decodedToken));
            navigate(getLastVisitedUrlLocalStorage() ?? `${ROUTES.questions}`);
          } else {
            dispatch(error("Invalid token!"));
          }
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong!"
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };

  return (
    <Space className="xs-login-form-container sm-login-form-container login-form-container d-flex flex-column justify-content-center align-items-center">
      <Form
        form={form}
        name="login"
        layout="vertical"
        initialValues={{ remember: true, rememberMe: false }}
        onFinish={onFinish}
        className="mt-2"
      >
        <CTextField
          classes="color-white"
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
          label="Password"
          size="large"
          fieldProps={{
            textFieldProps: {
              type: "password",
              name: "password",
              placeholder: "xyz@123",
            },
          }}
          rules={[{ required: true, message: "Please input your Password!" }]}
        />

        <CCheckbox
          label="Remember Me"
          fieldProps={{
            checkboxFieldProps: {
              name: "rememberMe",

              checked: false,
            },
          }}
        />

        <Form.Item className="mt-2">
          <CSubmitButton size="large" className="color-white" form={form}>
            Sign In
          </CSubmitButton>
        </Form.Item>
      </Form>
      <div className="w-100-per d-flex justify-content-center align-items-center mt-1">
        <CLink path={ROUTES.signUp} children="Register Now" />
        <Divider type="vertical" />
        <CLink
          className="color-danger"
          path={ROUTES.forgotPassword}
          children="Forgot Password?"
        />
      </div>
    </Space>
  );
};

export default PSignin;
