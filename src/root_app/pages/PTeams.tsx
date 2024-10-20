import React, { useEffect, useMemo, useState } from "react";
import {
  CAvatar,
  CButton,
  CItalicText,
  CTeamCard,
  CTooltip,
} from "../components";
import {
  Row,
  Col,
  Avatar,
  Card,
  Layout,
  Menu,
  Grid,
  List,
  Divider,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  LayoutDashboardIcon,
  MedalIcon,
  MessageCircleQuestionIcon,
  PiggyBankIcon,
  PlusIcon,
  ShieldQuestionIcon,
  SquarePenIcon,
  UserPenIcon,
  UsersIcon,
} from "../utilities/icons";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useDispatch } from "react-redux";
import { start, stop } from "../redux/slices/loaderSlice";
import { getCompanyTeams } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error } from "../redux/slices/notificationSlice";
import { ITeamResponse } from "../interfaces/teams";
type MenuItem = Required<MenuProps>["items"][number];

const PTeams = () => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.theme);
  const [teams, setTeams] = useState<ITeamResponse[]>([]);
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();
  const items: MenuItem[] = [
    {
      key: "Add team button",
      label: (
        <CButton
          className="mt-2"
          type="primary"
          text="Create Team"
          Icon={<PlusIcon />}
        />
      ),
    },
    {
      key: "dashboard",
      icon: <LayoutDashboardIcon />,
      label: "Dashboard",
    },
    {
      key: "blogs",
      icon: <SquarePenIcon />,
      label: "Blogs",
      children: [
        {
          key: "written blogs",
          label: "Written Blogs",
        },
        {
          key: "bookmarked blogs",
          label: "Bookmarked Blogs",
        },
      ],
    },
    {
      key: "questions",
      icon: <ShieldQuestionIcon />,
      label: "Questions",
      children: [
        {
          key: "asked questions",
          label: "Asked Questions",
        },
        {
          key: "saved questions",
          label: "Saved Questions",
        },
      ],
    },
    {
      key: "teams",
      icon: <UsersIcon />,
      label: "Teams",
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

  const fetchTeams = () => {
    dispatch(start());
    getCompanyTeams(controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setTeams(res?.data?.data || []);
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
    fetchTeams();
    return () => controller.abort();
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-right align-items-center mb-2 shadow-none">
        <CButton
          text="Create Team"
          type="primary"
          Icon={<PlusIcon />}
          onClick={() => navigate(ROUTES.createTeam)}
        />
      </div>
      <List
        className="teams-container"
        dataSource={teams}
        renderItem={(team: ITeamResponse) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <CAvatar src={team.logo as string} height="50px" width="50px" />
              }
              title={
                <a className="font-18" href={`#${ROUTES.team}/${team.id}`}>
                  {team.title}
                </a>
              }
              description={
                <React.Fragment>
                  {team.description ? team.description : "No description"}
                  <div className="d-flex align-items-center teams-meta-details-container mt-1">
                    <CTooltip title="Total Members">
                      <div
                        className="team-members-container"
                        style={{ color: "#13C2C2" }}
                      >
                        <UsersIcon style={{ height: 14 }} />
                        {team.members?.length || 0}
                      </div>
                    </CTooltip>
                    <Divider type="vertical" style={{ height: 14 }} />
                    <CTooltip title="Total Questions">
                      <div
                        className="team-members-container"
                        style={{ color: "#FAAD14" }}
                      >
                        <MessageCircleQuestionIcon style={{ height: 14 }} />
                        {team.members?.length || 0}
                      </div>
                    </CTooltip>
                  </div>
                </React.Fragment>
              }
            />
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};

export default PTeams;
