import { Avatar, Card, Col, Form, Grid, Row, Transfer, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import type { TransferProps } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { start, stop } from "../redux/slices/loaderSlice";
import { getCompanyUsers, getTeamById } from "../apis";
import { IApiResponse } from "../interfaces/commons";
import { error } from "../redux/slices/notificationSlice";
import { IUserResponse } from "../interfaces/user";
import { CAvatar, CButton, CCheckbox, CDropdown, CModal } from "../components";
import { useSelector } from "react-redux";
import {
  IMembersRequest,
  ITeamResponse,
  IUserTeamResponse,
} from "../interfaces/teams";
import { EllipsisVerticalIcon } from "../utilities/icons";
import useAntModal from "../hooks/useModal";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation, useParams } from "react-router-dom";

interface IPermissions {
  read: boolean;
  write: boolean;
  owner: boolean;
  answer: boolean;
  comment: boolean;
  isActive: boolean;
}

interface RecordType extends IPermissions {
  id: string;
  profilePic: string;
  name: string;
  designation: string;
}

const getUserMenus = (
  user: RecordType,
  handleApplyClick: (userId: string) => void
) => {
  return [
    {
      key: "read",
      label: (
        <CCheckbox
          label="Can Read?"
          fieldProps={{
            checkboxFieldProps: {
              name: "read",
              defaultChecked: user?.read,
            },
          }}
        />
      ),
    },
    {
      key: "write",
      label: (
        <CCheckbox
          label="Can Write?"
          fieldProps={{
            checkboxFieldProps: {
              name: "write",
              defaultChecked: user?.write,
            },
          }}
        />
      ),
    },
    {
      key: "answer",
      label: (
        <CCheckbox
          label="Can Answer?"
          fieldProps={{
            checkboxFieldProps: {
              name: "answer",
              defaultChecked: user?.answer,
            },
          }}
        />
      ),
    },
    {
      key: "comment",
      label: (
        <CCheckbox
          label="Can Comment?"
          fieldProps={{
            checkboxFieldProps: {
              name: "comment",
              defaultChecked: user?.comment,
            },
          }}
        />
      ),
    },
    {
      key: "owner",
      label: (
        <CCheckbox
          label="Is Owner?"
          fieldProps={{
            checkboxFieldProps: {
              name: "owner",
              defaultChecked: user?.owner,
            },
          }}
        />
      ),
    },
    {
      key: "isActive",
      label: (
        <CCheckbox
          label="Is Active?"
          fieldProps={{
            checkboxFieldProps: {
              name: "isActive",
              defaultChecked: user?.isActive,
            },
          }}
        />
      ),
    },
    {
      key: "Apply",
      label: (
        <CButton
          onClick={() => handleApplyClick(user?.id)}
          className="w-100-per mt-1"
          text="Apply"
          type="primary"
        />
      ),
    },
  ];
};

const PModifyTeamMembers = () => {
  const controller = new AbortController();
  const { id } = useParams<string>();
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch<AppDispatch>();
  const { CompanyId } = useSelector((state: RootState) => state.user);
  const [companyUsers, setCompanyUsers] = useState<IUserResponse[]>([]);
  const [teamDetails, setTeamDetails] = useState<ITeamResponse>(
    {} as ITeamResponse
  );
  const [modifiedUsers, setModifiedUsers] = useState<
    Record<string, IMembersRequest>
  >({} as Record<string, IMembersRequest>);

  const fetchCompanyUsers = () => {
    dispatch(start());
    getCompanyUsers(CompanyId as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setCompanyUsers(res?.data?.data || []);
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

  const fetchTeamDetails = () => {
    dispatch(start());
    getTeamById(id as string, controller.signal)
      .then((res: IApiResponse) => {
        if (res?.status === 200) {
          setTeamDetails(res?.data?.data);
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

  const teamMembersObject: Record<string, IUserTeamResponse> = useMemo(() => {
    let teamMembers: Record<string, IUserTeamResponse> = {};

    teamDetails?.members?.map((member: IUserTeamResponse) => {
      teamMembers[member.id] = member;
    });

    return teamMembers;
  }, [teamDetails]);

  const companyUsersMemo: RecordType[] = useMemo(() => {
    return companyUsers?.map((user: IUserResponse) => {
      const existingUser = teamMembersObject[user.id];

      if (existingUser) {
        return {
          id: user.id,
          profilePic: user.profilePic,
          name: user.name,
          designation: user.designation,
          read: existingUser.canRead,
          write: existingUser.canWrite,
          owner: existingUser.isOwner,
          answer: existingUser.canAnswer,
          comment: existingUser.canComment,
          isActive: existingUser.isActive,
        } as RecordType;
      } else {
        return {
          id: user.id,
          profilePic: user.profilePic,
          name: user.name,
          designation: user.designation,
          read: false,
          write: false,
          owner: false,
          answer: false,
          comment: false,
          isActive: false,
        } as RecordType;
      }
    });
  }, [companyUsers, teamMembersObject]);

  const Action = ({ user }: { user: RecordType }) => {
    const [form] = Form.useForm<RecordType>();

    const handleApplyClick = (id: string) => {
      console.log(id, form.getFieldsValue());
    };

    return (
      <div className="team-member-permissions pl-12 pr-12 d-flex justify-content-space-between align-items-center">
        <Typography.Text>Permissions</Typography.Text>
        <Form form={form} initialValues={{ ...user }}>
          <CDropdown
            className="team-member-permissions-dropdown"
            items={getUserMenus(user, handleApplyClick)}
            children={<EllipsisVerticalIcon />}
          />
        </Form>
      </div>
    );
  };

  useEffect(() => {
    fetchCompanyUsers();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    id && fetchTeamDetails();
    return () => controller.abort();
  }, [id]);

  return (
    <div
      className="min-h-100-per"
      style={{ margin: screens.xs ? "24px 3%" : "24px 15%" }}
    >
      <Typography.Title level={3} className="text-left">
        Modify Team Members
      </Typography.Title>
      <Row gutter={[8, 8]}>
        {companyUsersMemo?.map((user: RecordType, index: number) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              actions={[<Action user={user} />]}
              className="team-member-card"
            >
              <Card.Meta
                avatar={<CAvatar src={user.profilePic} />}
                title={user.name}
                description={
                  <p className="text">{user.designation || "..."}</p>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PModifyTeamMembers;
