import { Col, Form, Grid, Row, Typography } from "antd";
import React, { useState } from "react";
import { IPostTeam } from "../interfaces/teams";
import {
  CTextField,
  CSubmitButton,
  CLink,
  CTextArea,
  DragAndDrop,
} from "../components";
import { ROUTES } from "../constants";
import { postTeam } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { error, success } from "../redux/slices/notificationSlice";

const PCreateTeam = () => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<IPostTeam>();
  const [logoImage, setLogoImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");
  const screens = Grid.useBreakpoint();

  const onFinish = (data: IPostTeam) => {
    dispatch(start());
    data.logo = logoImage;
    data.bannerImage = bannerImage;
    postTeam(data, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("Team created successfully"));
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.statusText ||
                "Something went wrong."
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };

  return (
    <div className="min-h-100-per">
      <Typography.Title level={3} className="text-left">
        Create Team
      </Typography.Title>
      <Form
        form={form}
        name="signup"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-100-per mt-2"
      >
        <CTextField
          label="Title"
          size="large"
          fieldProps={{
            textFieldProps: {
              name: "title",
              placeholder: "",
              type: "text",
            },
          }}
          rules={[{ required: true, message: "Please input your team title!" }]}
        />
        <CTextArea
          label="Description"
          fieldProps={{
            textAreaProps: {
              name: "description",
              placeholder: "Team Description",
              showCount: true,
              maxLength: 150,
            },
          }}
        />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12}>
            <Typography.Text className="mt-1">Choose a logo</Typography.Text>
            <DragAndDrop
              className="mt-1"
              loadImage={(file: any) => setLogoImage(file?.response?.data?.url)}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Typography.Text className="mt-1">
              Choose a banner Image
            </Typography.Text>
            <DragAndDrop
              className="mt-1"
              loadImage={(file: any) =>
                setBannerImage(file?.response?.data?.url)
              }
            />
          </Col>
        </Row>

        <Form.Item className="mt-2 mb-2 d-flex align-items-center">
          <CSubmitButton
            // className="mt-2 mb-2"
            size="large"
            fullWidth={true}
            form={form}
          >
            Create
          </CSubmitButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PCreateTeam;
