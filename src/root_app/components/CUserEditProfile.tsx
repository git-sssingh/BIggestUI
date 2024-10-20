import { Col, Descriptions, Form, Row, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import { IUpdateUserRequest, IUserResponse } from "../interfaces/user";
import { CSubmitButton, CTextArea, CTextField } from ".";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { getUserById, putUpdateUser } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";
import type { DescriptionsProps } from "antd";
import { useSelector } from "react-redux";
import { getTimeByAgo } from "../utilities";

type CUserEditProfileProp = {
  user: IUserResponse;
  updater: () => void;
};

const CUserEditProfile: React.FC<CUserEditProfileProp> = ({
  user,
  updater,
}) => {
  const [form] = Form.useForm<IUpdateUserRequest>();
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const { Id } = useSelector((state: RootState) => state.user);

  const handleSubmit = (values: IUpdateUserRequest) => {
    console.log(values);
    dispatch(start());
    const payload: IUpdateUserRequest = {
      name: values.name,
      contactNumber: values.contactNumber,
      designation: values.designation,
      description: values.description,
    };
    putUpdateUser(payload, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          updater && updater();
          dispatch(success("Profile Updated Successfully"));
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

  const items: DescriptionsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: "Joined",
        children: getTimeByAgo(user?.createdDate),
      },
      {
        key: "2",
        label: "Last Updated",
        children: getTimeByAgo(user?.lastUpdated),
      },
    ],
    [user]
  );

  useEffect(() => {
    user && form.setFieldsValue(user);
    return () => controller.abort();
  }, [user]);

  return (
    <React.Fragment>
      <Descriptions items={items} className="mt-2" />
      <Form
        className="mt-2"
        form={form}
        layout="vertical"
        name="update-profile"
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <CTextField
              label="Company"
              name={["companyDetail", "name"]}
              fieldProps={{
                textFieldProps: {
                  placeholder: "Company Name",
                  type: "text",
                  readOnly: true,
                },
              }}
              rules={[
                { required: true, message: "Please input your Company Name!" },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <CTextField
              label="User Id"
              fieldProps={{
                textFieldProps: {
                  name: "userId",
                  placeholder: "E123456",
                  type: "text",
                  readOnly: true,
                },
              }}
              rules={[
                { required: true, message: "Please input your User Id!" },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <CTextField
              label="Name"
              fieldProps={{
                textFieldProps: {
                  name: "name",
                  placeholder: "John Doe",
                  type: "text",
                  readOnly: user?.id !== Id,
                },
              }}
              rules={[{ required: true, message: "Please input your Name!" }]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <CTextField
              label="Email"
              fieldProps={{
                textFieldProps: {
                  name: "emailId",
                  placeholder: "xyz@gmail.com",
                  type: "email",
                  readOnly: true,
                },
              }}
              rules={[
                { required: true, message: "Please input your User Id!" },
                { type: "email", message: "Please input valid email!" },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <CTextField
              label="Contact Number"
              fieldProps={{
                textFieldProps: {
                  name: "contactNumber",
                  placeholder: "1234567890",
                  type: "number",
                  readOnly: user?.id !== Id,
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Contact Number!",
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <CTextField
              label="Designation"
              fieldProps={{
                textFieldProps: {
                  name: "designation",
                  placeholder: "Software Engineer",
                  type: "text",
                  readOnly: user?.id !== Id,
                },
              }}
              rules={[
                { required: true, message: "Please input your Designation!" },
              ]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24}>
            <CTextArea
              label="Description"
              fieldProps={{
                textAreaProps: {
                  name: "description",
                  placeholder: "Write something about yourself",
                  maxLength: 150,
                  readOnly: user?.id !== Id,
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                },
              ]}
            />
          </Col>
        </Row>
        <Form.Item className="d-flex justify-content-center mt-4">
          {user?.id === Id && (
            <CSubmitButton form={form}> Update Profile </CSubmitButton>
          )}
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default CUserEditProfile;
