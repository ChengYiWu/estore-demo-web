import useStore from "@/store/store";
import { antdUtils } from "@/utils/antd.util";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Layout, Popover, Tooltip } from "antd";
import { createStyles } from "antd-style";
import managerImage from "@/assets/personal-security.png";
import { useNavigate } from "react-router-dom";
import { Routes } from "./routes";
import routeUtil from "@/utils/route.util";
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

const { Header } = Layout;

const userAvatarImage =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const useStyle = createStyles(({ token }) => ({
  root: {
    padding: 0,
    paddingRight: "1.5rem",
    background: token.colorBgContainer,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  popoverRoot: {
    "& .ant-popover-inner": {
      padding: 0,
    },
  },
  contentTop: {
    position: "relative",
    padding: "4rem",
    background: token.colorPrimary,
  },

  contentInfoWrapper: {
    padding: "1rem 4rem",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentAvatar: {
    zIndex: 2,
    transform: "translateY(-50%)",
    position: "absolute",

    "& .edit": {
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 3,
      transform: "translate(50%, -50%)",
    },
  },
  contentUserInfo: {
    marginTop: "4.5rem",
    textAlign: "center",

    "& .name": {
      fontSize: "1.5rem",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& img": {
        marginRight: "0.5rem",
        width: "1.25rem",
        height: "1.25rem",
      },
    },
    "& .email": {
      fontSize: "1rem",
      color: "#6b6b6b",
    },
  },
  contentExtraWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "& .item": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#6b6b6b",
      fontSize: "1rem",
      fontWeight: 600,
      "& .number": {
        fontSize: "1.5rem",
      },
      "& .type": {
        fontSize: "0.75rem",
      },
    },
    "& .divider": {
      flex: 0,
      flexBasis: "1px",
      width: "1px",
      height: "1rem",
      background: "#cfcfcf",
    },
  },

  operationWrapper: {
    padding: "0 1rem 1rem 1rem",

    "& .divider": {
      margin: "0.5rem 0px 1rem 0px",
    },

    "& .opertation": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  },
  avatar: {
    cursor: "pointer",
    boxShadow: token.boxShadow,
    border: "none",
    "&:hover": {
      boxShadow: token.boxShadowTertiary,
    },
    "&:hover img": {
      transform: "scale(1.2)",
      transition: ".3s",
    },
  },
}));

const AdminLayoutHeader = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();

  return (
    <Header className={styles.root}>
      <Popover
        rootClassName={styles.popoverRoot}
        arrow={false}
        placement="bottom"
        trigger={["click", "hover"]}
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        content={
          <div>
            <div className={styles.contentTop} />
            <div className={styles.contentInfoWrapper}>
              <div className={styles.contentAvatar}>
                <Avatar shape="square" size={128} src={<img src={userAvatarImage} />} />
              </div>
              <div className={styles.contentUserInfo}>
                <div className="name">
                  {user.isAdmin && (
                    <Tooltip title="管理員">
                      <img src={managerImage} />
                    </Tooltip>
                  )}
                  {user.userName}
                </div>
                <div className="email">
                  {user.email}
                </div>
              </div>
            </div>
            <div className={styles.contentExtraWrapper}>
              <div className="item">
                <div className="number">36</div>
                <div className="type">出貨</div>
              </div>
              <div className="divider"></div>
              <div className="item">
                <div className="number">8</div>
                <div className="type">退貨</div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div className={styles.operationWrapper}>
              <Divider className="divider" />
              <div className="opertation">
                <Button
                  block
                  icon={<EditOutlined />}
                  onClick={() => {
                    setOpen(false);
                    navigate(routeUtil.getRoutePath(Routes.EditUser, { id: user.id }));
                  }}
                >
                  修改
                </Button>
                <Button
                  block
                  danger
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    antdUtils.modal?.confirm({
                      title: "確認",
                      okText: "確定",
                      cancelText: "取消",
                      content: "確定要登出嗎？",
                      onOk: () => {
                        logout(() => {
                          setTimeout(() => {
                            antdUtils.notification?.success({
                              message: "登出成功",
                              placement: "bottomRight",
                              duration: 2,
                            });
                          });
                        });
                      },
                    });
                  }}
                >
                  登出
                </Button>
              </div>
            </div>
          </div>
        }
      >
        <Avatar
          size={48}
          shape="square"
          icon={<UserOutlined />}
          src={<img src={userAvatarImage} />}
          className={styles.avatar}
        />
      </Popover>
    </Header>
  );
};

export default AdminLayoutHeader;
