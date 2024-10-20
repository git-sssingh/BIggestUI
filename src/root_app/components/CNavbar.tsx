import React, { useMemo, useState } from "react";
import { Divider, Drawer, Layout, Menu, Space } from "antd";
import { NAV_BAR_MENUS } from "../utilities/menus";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import {
  LockKeyholeIcon,
  LogOutIcon,
  UserPenIcon,
  UsersIcon,
  XIcon,
} from "../utilities/icons";
import Logo from "./CLogo";
import { CAvatar, CButton, CDropdown, CItalicText, CLink } from ".";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { clearLocalStorage } from "../storage/local";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slices/authSlice";
import { IMenuItem } from "../types";
import { getGreeting } from "../utilities";

const { Header } = Layout;

type CNavbarProps = {
  menus?: IMenuItem[];
};

const CNavbar: React.FC<CNavbarProps> = ({ menus }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { ProfileImage, Name, Id } = useSelector(
    (state: RootState) => state.user
  );
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const selectedPath = useMemo(
    () => location?.pathname?.split("/")?.at(1),
    [location]
  );

  const getUserMenus = ({ userId }: { userId: string }) => {
    return [
      {
        key: "1",
        icon: <UserPenIcon />,
        label: (
          <CLink
            children="Profile"
            path={`${ROUTES.portfolio}${userId}`}
            className="color-black"
          />
        ),
      },
      {
        key: "2",
        icon: <LockKeyholeIcon />,
        label: (
          <CLink
            children="Change Password"
            path={ROUTES.forgotPassword}
            className="color-black"
          />
        ),
      },
      {
        key: "3",
        icon: <UsersIcon />,
        label: (
          <CLink children="Teams" path={ROUTES.teams} className="color-black" />
        ),
      },
      {
        key: "4",
        icon: <LogOutIcon className="color-danger" />,
        label: (
          <CLink
            children="Logout"
            path={ROUTES.home}
            className="color-danger"
          />
        ),
        onClick: () => {
          clearLocalStorage();
          dispatch(clearAuth());
        },
      },
    ];
  };

  return (
    <React.Fragment>
      <Header className="navbar d-flex justify-content-space-between align-items-center w-100-per bg-white">
        <div className="cursor-pointer font-24 side-bar-action-btn-container xs-d-flex sm-d-flex d-none">
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
          ) : (
            <MenuUnfoldOutlined onClick={() => setCollapsed(true)} />
          )}
        </div>
        <React.Fragment>
          <Logo className="xs-d-none sm-d-none md-d-flex" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[selectedPath as string]}
            className="mr-3 xs-d-none sm-d-none md-d-flex justify-content-right"
            style={{ flex: 1, minWidth: 0 }}
          >
            {menus && menus?.length > 0
              ? menus.map((menu) => (
                  <Menu.Item
                    key={menu?.key}
                    onClick={() =>
                      menu.key === "aboutus" || menu.key === "pricing"
                        ? navigate(ROUTES.home, {
                            state: { page: menu.key },
                          })
                        : navigate(menu.route as string)
                    }
                  >
                    {menu?.literal}
                  </Menu.Item>
                ))
              : NAV_BAR_MENUS.map((menu) => (
                  <Menu.Item
                    key={menu.key}
                    onClick={() => navigate(menu.route as string)}
                  >
                    {menu.literal}
                  </Menu.Item>
                ))}
          </Menu>
        </React.Fragment>

        {accessToken ? (
          <div className="d-flex align-items-center ">
            <CDropdown
              items={getUserMenus({ userId: Id })}
              children={
                <div
                  className="d-flex align-items-center cursor-pointer"
                  style={{ lineHeight: 0 }}
                >
                  <CAvatar src={ProfileImage} height="40px" width="40px" />
                  <div className="ml-1 mt-1 d-flex flex-column xs-d-none">
                    <strong>{getGreeting()}</strong>
                    <CItalicText children={Name} />
                  </div>
                </div>
              }
            />
          </div>
        ) : (
          <div className="user-actions-container d-flex align-items-center ">
            <CButton
              text="Sign up"
              type="text"
              onClick={() => navigate(ROUTES.signUp)}
              className="color-danger mr-1"
              style={{ borderRadius: "30px" }}
            />
            <CButton
              text="Sign In"
              type="primary"
              onClick={() => navigate(ROUTES.signIn)}
              style={{ borderRadius: "30px" }}
            />
          </div>
        )}

        <Drawer
          title={<Logo />}
          placement="left"
          closable={false}
          open={collapsed}
          key={"left"}
          extra={
            <Space>
              <XIcon onClick={() => setCollapsed(false)} />
            </Space>
          }
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={[selectedPath as string]}
            style={{ borderInlineEnd: "none" }}
            className="font-18 font-weight-600"
          >
            {menus && menus?.length > 0
              ? menus.map((menu) => (
                  <Menu.Item
                    key={menu?.key}
                    onClick={() =>
                      menu.key === "aboutus" || menu.key === "pricing"
                        ? navigate(ROUTES.home, {
                            state: { page: menu.key },
                          })
                        : navigate(menu.route as string)
                    }
                  >
                    {menu?.literal}
                  </Menu.Item>
                ))
              : NAV_BAR_MENUS.map((menu) => (
                  <Menu.Item
                    key={menu.key}
                    onClick={() => navigate(menu.route as string)}
                  >
                    {menu.literal}
                  </Menu.Item>
                ))}
          </Menu>
        </Drawer>
      </Header>
      <Divider style={{ margin: 0 }} />
    </React.Fragment>
  );
};

export default CNavbar;
