import React, { useEffect, useState } from "react";
import { ICreateCompany, IPaymentDetails } from "../interfaces/company";
import { Col, Form, Grid, Row, Typography } from "antd";
import { useDispatch } from "react-redux";
import { postCompany } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { start, stop } from "../redux/slices/loaderSlice";
import { success, error } from "../redux/slices/notificationSlice";
import { AppDispatch } from "../redux/store";
import {
  CTextField,
  CTextArea,
  CSubmitButton,
  CItalicText,
  CSuccessfulPurchasedSubscription,
} from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

const PCreateCompany: React.FC = () => {
  const controller = new AbortController();
  const [form] = Form.useForm<ICreateCompany>();
  const dispatch = useDispatch<AppDispatch>();
  const screens = Grid.useBreakpoint();
  const navigate = useNavigate();
  const [isCompanyCreated, setIsCompanyCreated] = useState<boolean>(false);
  const { state } = useLocation();
  const onFinish = async (data: ICreateCompany) => {
    navigate(
      ROUTES.purchaseSubscription.replace(":id", state?.subscription?.id),
      {
        state: {
          subscription: state?.subscription,
          companyDetails: data,
        },
      }
    );
    // dispatch(start());
    // data = {
    //   ...data,
    //   subscriptionId: state?.subscriptionId,
    //   paymentDetails: state?.paymentDetails,
    // };
    // postCompany(data, controller.signal)
    //   .then((res: IApiResponse) => {
    //     if (res?.status === 200) {
    //       dispatch(success("Company created successfully."));
    //       setIsCompanyCreated(true);
    //     } else {
    //       dispatch(error(res?.statusText || res?.error));
    //     }
    //   })
    //   .finally(() => {
    //     dispatch(stop());
    //   });
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, []);

  if (isCompanyCreated) return <CSuccessfulPurchasedSubscription />;

  return (
    <React.Fragment>
      <Typography.Title level={3}>Create Company</Typography.Title>
      <CItalicText children={"Fill the form below to create your company."} />
      <Form
        form={form}
        name="create company"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="mt-4"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <CTextField
              label="Name"
              fieldProps={{
                textFieldProps: {
                  name: "name",
                  placeholder: "ABC Pvt. Ltd.",
                  type: "text",
                },
              }}
              rules={[
                { required: true, message: "Please input your Company Name!" },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
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
                { required: true, message: "Please input your Company Email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <CTextField
              label="Contact Number"
              fieldProps={{
                textFieldProps: {
                  name: "contactNumber",
                  placeholder: "1234567890",
                  type: "number",
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Company Contact Number!",
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CTextField
              label="Address"
              fieldProps={{
                textFieldProps: {
                  name: "address",
                  placeholder: "123, ABC Street, XYZ City",
                  type: "text",
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Company Address!",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <CTextField
              label="City"
              fieldProps={{
                textFieldProps: {
                  name: "city",
                  placeholder: "XYZ City",
                  type: "text",
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Company City!",
                },
              ]}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <CTextField
              label="Pin Code"
              fieldProps={{
                textFieldProps: {
                  name: "pinCode",
                  placeholder: "123456",
                  type: "number",
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input Area Pin Code!",
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
                  placeholder: "Company Description",
                  showCount: true,
                  maxLength: 150,
                },
              }}
              rules={[
                {
                  required: true,
                  message: "Please input your Company Description!",
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

export default PCreateCompany;
