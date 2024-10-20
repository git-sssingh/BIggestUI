import React, { useEffect, useMemo, useState } from "react";
import { IUserTeamResponse } from "../interfaces/teams";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { getUserTeams } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error } from "../redux/slices/notificationSlice";
import { List, Divider, Tag, Space, Grid } from "antd";
import { ROUTES } from "../constants";
import CAvatar from "./CAvatar";
import { PencilIcon, PlusIcon } from "../utilities/icons";
import { useNavigate, useParams } from "react-router-dom";
import CItalicText from "./CItalicText";
import { getTimeByAgo } from "../utilities";
import { useSelector } from "react-redux";

const CUserTeams = () => {
  const controller = new AbortController();
  const dispatch = useDispatch<AppDispatch>();
  const [teams, setTeams] = useState<IUserTeamResponse[]>();
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();
  const { id } = useParams<string>();
  const { Id } = useSelector((state: RootState) => state.user);

  const fetchUserTeams = () => {
    dispatch(start());
    getUserTeams(id as string, controller.signal)
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
    fetchUserTeams();
    return () => controller.abort();
  }, []);

  return (
    <List
      className="teams-container"
      dataSource={teams}
      renderItem={(team: IUserTeamResponse) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <CAvatar
                src={team.profilePic as string}
                height="50px"
                width="50px"
              />
            }
            title={
              <a className="font-18" href={`#${ROUTES.team}/${team.id}`}>
                {team.name}
              </a>
            }
            description={
              <React.Fragment>
                {team.description ? team.description : "No description"}
                <br />
                <br />
                <Space
                  className="user-team-descriptions"
                  split={
                    <Divider type={screens.xs ? "horizontal" : "vertical"} />
                  }
                  style={{
                    flexDirection: screens.xs ? "column" : "row",
                    alignItems: screens.xs ? "baseline" : "center",
                  }}
                >
                  <CItalicText
                    children={
                      <React.Fragment>
                        Created {getTimeByAgo(team?.createdDate)}
                      </React.Fragment>
                    }
                  />
                  <CItalicText
                    children={
                      <React.Fragment>
                        Last Updated {getTimeByAgo(team?.lastUpdated)}
                      </React.Fragment>
                    }
                  />
                  {id === Id && (
                    <Tag
                      className="cursor-pointer d-flex align-items-center justify-content-space-between"
                      icon={<PencilIcon style={{ height: "12px" }} />}
                      color="default"
                      onClick={() => {
                        const route = `${ROUTES.updateTeam}`.replace(
                          ":id",
                          team.id
                        );
                        navigate(route, {
                          state: {
                            data: team,
                          },
                        });
                      }}
                    >
                      Edit
                    </Tag>
                  )}

                  {id === Id && (
                    <Tag
                      className="cursor-pointer d-flex align-items-center justify-content-space-between"
                      icon={<PlusIcon style={{ height: "12px" }} />}
                      color="default"
                      onClick={() => {
                        const route = `${ROUTES.modifyTeamMembers}`.replace(
                          ":id",
                          team.id
                        );
                        navigate(route);
                      }}
                    >
                      Update Members
                    </Tag>
                  )}
                </Space>
              </React.Fragment>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default CUserTeams;
