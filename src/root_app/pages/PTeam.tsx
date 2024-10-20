import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { getTeamById, putTeam } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import {
  IPutTeam,
  ITeamResponse,
  IUserTeamResponse,
} from "../interfaces/teams";
import { error } from "../redux/slices/notificationSlice";
import {
  Upload,
  Typography,
  Tag,
  UploadProps,
  Col,
  Row,
  Card,
  Statistic,
  List,
} from "antd";
import { CAvatar, CButton, CCheckbox, CItalicText } from "../components";
import { useSelector } from "react-redux";
import { API_URLS, ROUTES } from "../constants";
import BannerImage from "../assets/blog-default-image.png";
import { formatNumber, getTimeByAgo } from "../utilities";
import { CameraIcon, PlusIcon } from "../utilities/icons";

const PTeam = () => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<string>();
  const [team, setTeam] = useState<ITeamResponse>();
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const { Id, TeamId } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const props: UploadProps = useMemo(
    () => ({
      action: API_URLS.POST_FILE,
      multiple: false,
      showUploadList: false,
      onChange({ file, fileList }) {
        if (file.status !== "uploading") {
          const payload: IPutTeam = {
            logo: file?.response?.data?.url as string,
            title: team?.title as string,
            description: team?.description as string,
            bannerImage: team?.banner as string,
            isActive: team?.isActive as boolean,
          };
          putTeam(id as string, payload, controller.signal).then(
            (res: IApiResponse) => {
              if (res?.status === 200) {
                fetchTeamDetails();
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
            }
          );
        }
      },
    }),
    []
  );

  const isUserMember = useMemo(() => {
    return (
      Boolean(
        team?.members?.find((user) => user?.id === Id && user?.isActive)
      ) || team?.createdBy?.id === Id
    );
  }, [team, Id]);

  const fetchTeamDetails = () => {
    dispatch(start());
    getTeamById(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setTeam(res?.data?.data);
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
    id && fetchTeamDetails();
    return () => controller.abort();
  }, [id]);

  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={24} md={24} lg={16}>
        <React.Fragment>
          <div
            className="h-50 relative "
            style={
              team?.banner
                ? {
                    backgroundImage: `url(${team?.banner || BannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: 8,
                  }
                : {
                    backgroundColor: "#e0e0e0",
                    borderRadius: 8,
                  }
            }
          >
            <div className="relative d-flex team-logo">
              <CAvatar
                src={team?.logo as string}
                height="70px"
                width="70px"
                className="p-5 bg-white"
              />
              {team?.createdBy?.id === Id && (
                <Upload {...props}>
                  <CameraIcon
                    className="camera-icon color-white cursor-pointer"
                    style={{
                      position: "absolute",
                      top: "43px",
                      left: "50px",
                      fill: "#87d068",
                    }}
                  />
                </Upload>
              )}
              <div className="team-title-container ml-2">
                <Typography.Title level={3} className="text-capitalize mt-0">
                  {team?.title}
                </Typography.Title>
                {Boolean(team?.isActive) ? (
                  <Tag color="#87d068">Active</Tag>
                ) : (
                  <Tag color="#f50">Inactive</Tag>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Typography.Text className="font-16">
              {team?.description || "No description"}
            </Typography.Text>
            {Id === team?.createdBy?.id && (
              <React.Fragment>
                <Typography.Title level={5} className="mt-4">
                  Members ({team?.members?.length || 0})
                </Typography.Title>
                <List
                  className="team-members-list"
                  itemLayout="horizontal"
                  dataSource={team?.members}
                  renderItem={(item: IUserTeamResponse) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CAvatar src={item.profilePic} />}
                        title={
                          <a href={`#${ROUTES.portfolio}${item.id}`}>
                            {item.name}
                          </a>
                        }
                        description={
                          <React.Fragment>
                            {item.description}

                            <div className="d-flex align-items-center mt-1">
                              <CCheckbox
                                label="Read"
                                fieldProps={{
                                  checkboxFieldProps: {
                                    name: "canRead",
                                    value: item.canRead,
                                  },
                                }}
                              />
                              <CCheckbox
                                label="Write"
                                classes="ml-1"
                                fieldProps={{
                                  checkboxFieldProps: {
                                    name: "canWrite",
                                    value: item.canWrite,
                                  },
                                }}
                              />
                              <CCheckbox
                                label="Comment"
                                classes="ml-1"
                                fieldProps={{
                                  checkboxFieldProps: {
                                    name: "canComment",
                                    value: item.canComment,
                                  },
                                }}
                              />
                              <CCheckbox
                                label="Answer"
                                classes="ml-1"
                                fieldProps={{
                                  checkboxFieldProps: {
                                    name: "canAnswer",
                                    value: item.canAnswer,
                                  },
                                }}
                              />
                              <CCheckbox
                                label="Owner"
                                classes="ml-1"
                                fieldProps={{
                                  checkboxFieldProps: {
                                    name: "isOwner",
                                    value: item.isOwner,
                                  },
                                }}
                              />
                              <CCheckbox
                                label="Active"
                                classes="ml-1"
                                fieldProps={{
                                  checkboxFieldProps: {
                                    name: "isActive",
                                    value: item.isActive,
                                  },
                                }}
                              />
                            </div>
                          </React.Fragment>
                        }
                      />
                    </List.Item>
                  )}
                />
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8}>
        {isUserMember && (
          <Card className="d-flex justify-content-center align-items-center">
            <Card.Meta
              description={
                <CButton
                  onClick={() =>
                    navigate(ROUTES.addQuestion, {
                      state: {
                        teamId: team?.id,
                      },
                    })
                  }
                  text="Post a Question"
                  type="text"
                  Icon={<PlusIcon />}
                />
              }
            />
          </Card>
        )}

        <Card className={isUserMember ? "mt-2" : ""}>
          <Card.Meta
            description={
              <CItalicText
                children={
                  <React.Fragment>
                    Created by{" "}
                    <a href={`#${ROUTES.portfolio}${team?.createdBy.id}`}>
                      {team?.createdBy?.name}
                    </a>{" "}
                    {getTimeByAgo(team?.createdDate as string)}
                  </React.Fragment>
                }
              />
            }
          />
        </Card>
        <Card className="mt-2">
          <Card.Meta
            description={
              <CItalicText
                children={
                  <React.Fragment>
                    Last Updated by{" "}
                    <a href={`#${ROUTES.portfolio}${team?.lastUpdatedBy.id}`}>
                      {team?.lastUpdatedBy?.name}
                    </a>{" "}
                    {getTimeByAgo(team?.lastUpdatedDate as string)}
                  </React.Fragment>
                }
              />
            }
          />
        </Card>
        <Card
          className="mt-2"
          onClick={() => {
            const route = `${ROUTES.teamQuestions}`.replace(
              ":id",
              id as string
            );
            TeamId === id && navigate(route);
          }}
        >
          <Statistic
            title="Total Questions"
            value={formatNumber(totalQuestions)}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PTeam;
