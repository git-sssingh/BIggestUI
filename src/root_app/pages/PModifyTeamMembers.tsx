import { Avatar, Checkbox, Grid, List, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { getCompanyUsers, getTeamById, putAssignedUserById } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error, success } from "../redux/slices/notificationSlice";
import { IUserResponse } from "../interfaces/user";
import { useSelector } from "react-redux";
import { IMembersRequest, IUserTeamResponse } from "../interfaces/teams";
import { useParams } from "react-router-dom";
import { ROUTES } from "../constants";
import { CButton, CSearchBox } from "../components";

interface IPermissions {
  read: boolean;
  write: boolean;
  owner: boolean;
  answer: boolean;
  comment: boolean;
  isActive: boolean;
}

interface RecordType extends IPermissions {
  key: string;
  id: string;
  profilePic: string;
  name: string;
  designation: string;
  isModified: boolean;
  defaultValues: string[];
}

const PModifyTeamMembers = () => {
  const controller = new AbortController();
  const { id } = useParams<string>();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch<AppDispatch>();
  const { CompanyId } = useSelector((state: RootState) => state.user);
  const [assignedUsers, setAssignedUser] = useState<Record<string, RecordType>>(
    {} as Record<string, RecordType>
  );
  const [searchedValue, setSearchedValue] = useState<string>();

  const fetchTeamDetails = () => {
    dispatch(start());
    getTeamById(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          let teamMembers: Record<string, IUserTeamResponse> = {};
          res?.data?.data?.members?.map((member: IUserTeamResponse) => {
            teamMembers[member.id] = member;
          });

          getCompanyUsers(CompanyId as string, controller.signal).then(
            (res: IApiResponse) => {
              if (res?.status === 200) {
                res?.data?.data?.forEach((user: IUserResponse) => {
                  const existingUser: IUserTeamResponse = teamMembers[user.id];

                  if (existingUser) {
                    let defaultValues = [];
                    existingUser.canRead && defaultValues.push("read");
                    existingUser.canWrite && defaultValues.push("write");
                    existingUser.canAnswer && defaultValues.push("answer");
                    existingUser.canComment && defaultValues.push("comment");
                    existingUser.isOwner && defaultValues.push("owner");
                    existingUser.isActive && defaultValues.push("active");
                    setAssignedUser((prev) => ({
                      ...prev,
                      [user.id]: {
                        id: user.id,
                        name: user.name,
                        read: existingUser.canRead,
                        designation: user.designation,
                        profilePic: user.profilePic,
                        write: existingUser.canWrite,
                        answer: existingUser.canAnswer,
                        comment: existingUser.canComment,
                        owner: existingUser.isOwner,
                        isActive: existingUser.isActive,
                        isModified: false,
                        defaultValues: defaultValues,
                      } as RecordType,
                    }));
                  } else {
                    setAssignedUser((prev) => ({
                      ...prev,
                      [user.id]: {
                        id: user.id,
                        name: user.name,
                        designation: user.designation,
                        profilePic: user.profilePic,
                        read: false,
                        write: false,
                        answer: false,
                        owner: false,
                        isActive: false,
                        isModified: false,
                        defaultValues: [] as string[],
                      } as RecordType,
                    }));
                  }
                });
              } else {
                dispatch(
                  error(
                    res?.data?.message ||
                      res?.error ||
                      res?.status ||
                      "Something went wrong"
                  )
                );
              }
            }
          );
        } else {
          dispatch(
            error(
              res?.data?.message ||
                res?.error ||
                res?.status ||
                "Something went wrong"
            )
          );
        }
      })
      .finally(() => dispatch(stop()));
  };

  const onChange = (checkedValues: string[], id: string) => {
    setAssignedUser({
      ...assignedUsers,
      [id]: {
        ...assignedUsers[id],
        read: checkedValues.includes("read"),
        write: checkedValues.includes("write"),
        owner: checkedValues.includes("owner"),
        answer: checkedValues.includes("answer"),
        comment: checkedValues.includes("comment"),
        isActive: checkedValues.includes("isActive"),
        isModified: true,
      } as RecordType,
    });
  };

  const handleSubmitUser = () => {
    dispatch(start());
    const members: IMembersRequest[] = [];
    Object.values(assignedUsers)?.forEach((user: RecordType) => {
      if (user.isModified) {
        members.push({
          id: user.id,
          read: user.read,
          write: user.write,
          owner: user.owner,
          canAnswer: user.answer,
          canComment: user.comment,
          isActive: user.isActive,
        } as IMembersRequest);
      }
    });

    putAssignedUserById(id as string, { members }, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          dispatch(success("User assigned successfully"));
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
      })
      .finally(() => dispatch(stop()));
  };

  const searchedUser = useMemo(() => {
    let users = {} as Record<string, RecordType>;
    Object.values(assignedUsers).filter((user: RecordType) => {
      if (
        user.name?.toLowerCase().includes(searchedValue?.toLowerCase() || "") ||
        user.designation
          ?.toLowerCase()
          .includes(searchedValue?.toLowerCase() || "")
      ) {
        users[user.id] = user;
      }
    });

    return users;
  }, [searchedValue]);

  useEffect(() => {
    id && fetchTeamDetails();
    return () => controller.abort();
  }, [id]);

  return (
    <div className="min-h-100-per">
      <div className="d-flex flex-wrap justify-content-space-between align-items-center">
        <Typography.Title level={3} className="text-left">
          Modify Team Members
        </Typography.Title>
        <CSearchBox setValue={setSearchedValue} />
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
          marginTop: 8,
        }}
      >
        <List
          className="overflow-auto"
          itemLayout="horizontal"
          dataSource={
            Object.values(searchedUser).length > 0
              ? Object.values(searchedUser)
              : Object.values(assignedUsers)
          }
          renderItem={(item) => (
            <List.Item className="relative">
              <List.Item.Meta
                avatar={<Avatar src={item.profilePic} />}
                title={
                  <a
                    title={item.designation}
                    href={`#${ROUTES.portfolio}${item.id}`}
                  >
                    {item.name}
                  </a>
                }
                description={
                  <React.Fragment>
                    {item.designation || "..."}
                    <br />
                    <Checkbox.Group
                      options={[
                        {
                          label: "Read",
                          value: "read",
                        },
                        {
                          label: "Write",
                          value: "write",
                        },
                        {
                          label: "Answer",
                          value: "answer",
                        },
                        {
                          label: "Comment",
                          value: "comment",
                        },
                        {
                          label: "Owner",
                          value: "owner",
                        },
                        {
                          label: "Active",
                          value: "active",
                        },
                      ]}
                      onChange={(checkedValues) =>
                        onChange(checkedValues, item.id)
                      }
                      defaultValue={item.defaultValues}
                    />
                  </React.Fragment>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <div className="mt-2 d-flex justify-content-center">
        <CButton
          type="primary"
          text="Submit Users"
          onClick={handleSubmitUser}
        />
      </div>
    </div>
  );
};

export default PModifyTeamMembers;
