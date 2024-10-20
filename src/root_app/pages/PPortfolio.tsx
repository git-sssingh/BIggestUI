import {
  Col,
  Layout,
  Menu,
  Row,
  Space,
  theme,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TemplateImage from "../assets/templateImage.jpg";
import {
  CameraIcon,
  IdCardIcon,
  LayoutDashboardIcon,
  MedalIcon,
  PiggyBankIcon,
  Share2Icon,
  ShieldQuestionIcon,
  SquarePenIcon,
  UserPenIcon,
  UsersIcon,
} from "../utilities/icons";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useParams } from "react-router-dom";
import {
  getUserById,
  getUserActivityCount,
  putUpdateProfilePic,
} from "../apis";
import { API_URLS } from "../constants";
import { IApiResponse } from "../interfaces/commons";
import { IUserResponse, IUserCountResponse } from "../interfaces/user";
import { start, stop } from "../redux/slices/loaderSlice";
import { error } from "../redux/slices/notificationSlice";
import { RootState, AppDispatch } from "../redux/store";
import { getAuthLocalStorage } from "../storage/local";
import {
  CAvatar,
  CIconButton,
  CMembership,
  CModal,
  CShareLinkModal,
  CUserAskedQuestion,
  CUserBookmarkedBlogs,
  CUserBookmarkedQuestions,
  CUserDashboard,
  CUserEditProfile,
  CUserTeams,
  CUserWrittenBlogs,
} from "../components";
import useAntModal from "../hooks/useModal";
import type { MenuProps } from "antd";
import { CModalHandler } from "../types";
type MenuItem = Required<MenuProps>["items"][number];

const { Content, Sider } = Layout;

const PPortfolio: React.FC = () => {
  const controller = new AbortController();
  const { Id } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [currentTab, setCurrentTab] = React.useState("dashboard");
  const [user, setUser] = React.useState<IUserResponse>({} as IUserResponse);
  const { id } = useParams<string>();
  const modelRef = useRef<CModalHandler | null>(null);

  const [counts, setCounts] = useState<IUserCountResponse>(
    {} as IUserCountResponse
  );

  const cards = useMemo(() => {
    return [
      {
        title: "Questions",
        count: counts?.questionCount,
        Icon: <ShieldQuestionIcon />,
      },
      {
        title: "Articles",
        count: counts.wikiCount,
        Icon: <SquarePenIcon />,
      },
      {
        title: "Groups",
        count: counts.userTeamCount,
        Icon: <UsersIcon />,
      },
      {
        title: "Answers",
        count: counts.answerCount,
        Icon: <MedalIcon />,
      },
      {
        title: "Question Points",
        count: user?.questionPoint || 0,
        Icon: <PiggyBankIcon />,
      },
      {
        title: "Answer Points",
        count: user?.answerPoint || 0,
        Icon: <PiggyBankIcon />,
      },
    ];
  }, [counts, user]);

  const items: MenuItem[] = [
    {
      key: "dashboard",
      icon: <LayoutDashboardIcon />,
      label: "Dashboard",
    },
    {
      key: "articles",
      icon: <SquarePenIcon />,
      label: "Articles",
      children:
        id === Id
          ? [
              {
                key: "written articles",
                label: "Written Articles",
              },
              {
                key: "bookmarked articles",
                label: "Bookmarked Articles",
                show: id === Id,
              },
            ]
          : [
              {
                key: "written articles",
                label: "Written Articles",
              },
            ],
    },
    {
      key: "questions",
      icon: <ShieldQuestionIcon />,
      label: "Questions",
      children:
        id === Id
          ? [
              {
                key: "asked questions",
                label: "Asked Questions",
              },
              {
                key: "bookmarked questions",
                label: "Bookmarked Questions",
              },
            ]
          : [
              {
                key: "asked questions",
                label: "Asked Questions",
              },
            ],
    },
    {
      key: "teams",
      icon: <UsersIcon />,
      label: "Teams",
    },
    {
      key: "membership",
      icon: <IdCardIcon />,
      label: "Membership",
    },
    {
      key: "profile",
      icon: <UserPenIcon />,
      label: "Profile",
    },
  ].map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    children: item.children,
  }));

  const props: UploadProps = useMemo(
    () => ({
      action: API_URLS.POST_FILE,
      multiple: false,
      showUploadList: false,
      onChange({ file, fileList }) {
        if (file.status !== "uploading") {
          putUpdateProfilePic(
            file?.response?.data?.url,
            controller.signal
          ).then((res: IApiResponse) => {
            if (res?.status === 200) {
              fetchUser();
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
          });
        }
      },
    }),
    []
  );

  const fetchUser = useCallback(() => {
    dispatch(start());
    getUserById(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setUser(res?.data?.data);
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
  }, [id]);

  const component = useMemo(() => {
    switch (currentTab) {
      case "dashboard":
        return (
          <CUserDashboard
            cards={cards}
            description={user?.description as string}
            email={user?.emailId}
            phone={user?.contactNumber as string}
          />
        );

      case "written articles":
        return <CUserWrittenBlogs />;

      case "bookmarked articles":
        return <CUserBookmarkedBlogs />;

      case "asked questions":
        return <CUserAskedQuestion />;

      case "bookmarked questions":
        return <CUserBookmarkedQuestions />;

      case "teams":
        return <CUserTeams />;

      case "membership":
        return <CMembership />;

      case "profile":
        return <CUserEditProfile user={user} updater={fetchUser} />;

      default:
        return <CUserDashboard cards={cards} />;
    }
  }, [currentTab, user, cards]);

  const fetchUserActivityCounts = () => {
    dispatch(start());
    getUserActivityCount(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setCounts(res?.data?.data);
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
    id && fetchUser();
    id && fetchUserActivityCounts();
    return () => controller.abort();
  }, [id]);

  return (
    <React.Fragment>
      <div className="h-50 relative d-flex xs-align-items-center align-items-flex-end xs-justify-content-center portfolio-banner">
        <CIconButton
          tooltip="Share"
          icon={<Share2Icon />}
          onClick={() => modelRef.current?.modalOpen(true)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "2rem",
          }}
          className="xs-d-flex sm-d-flex d-none"
        />
        <div className="d-flex w-100-per align-items-flex-end justify-content-space-between">
          <div className="d-flex xs-w-100-per xs-flex-column sm-flex-row xs-align-items-center align-items-flex-end xs-justify-content-center sm-justify-content-center justify-content-space-between">
            <div className="relative">
              <CAvatar
                src={user?.profilePic as string}
                height="70px"
                width="70px"
                className="p-5 bg-white"
              />
              {id === Id && (
                <Upload {...props}>
                  <CameraIcon
                    className="camera-icon color-white cursor-pointer"
                    style={{
                      position: "absolute",
                      top: "43px",
                      right: "-6px",
                      fill: "#87d068",
                    }}
                  />
                </Upload>
              )}
            </div>
            <div className="ml-2 xs-text-center sm-text-left">
              <Typography.Title
                level={3}
                className="text-capitalize color-white"
              >
                {user?.name}
              </Typography.Title>
              <Typography className="color-white font-weight-500">
                {user?.designation}
              </Typography>
            </div>
          </div>
          <CIconButton
            tooltip="Share"
            icon={<Share2Icon />}
            onClick={() => modelRef.current?.modalOpen(true)}
            className="xs-d-none sm-d-none d-flex"
          />
        </div>
      </div>
      <Layout className="bg-white">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ paddingTop: "10px", borderRight: "1px solid #f0f0f0" }}
          className="bg-none"
        >
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            // theme="dark"
            items={items}
            onSelect={({ key }) => setCurrentTab(key)}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "24px" }} className="p-0 mt-0">
            <div
              style={{
                // padding: "24px",
                minHeight: 500,
              }}
            >
              {component}
            </div>
          </Content>
        </Layout>
      </Layout>
      <CModal
        ref={modelRef}
        title="Share Link"
        children={<CShareLinkModal />}
      />
    </React.Fragment>
  );
};

export default PPortfolio;
