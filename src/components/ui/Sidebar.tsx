import React, { useState } from "react";
import { Button, Layout, Menu, Popconfirm } from "antd";
import { CheckCircleOutlined, LineChartOutlined, SmileFilled, UndoOutlined } from "@ant-design/icons";
import {
  DesktopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
const { Sider } = Layout;
const { SubMenu } = Menu;

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  items?: MenuItem[];
  label: React.ReactNode;
  path: string;
  onClick?: () => void;
};

function getItem({
  key,
  icon,
  items,
  label,
  path,
  onClick,
}: MenuItem): React.ReactNode {
  if (items) {
    return (
      <SubMenu key={key} icon={icon} title={label}>
        {items.map((item) => getItem(item))}
      </SubMenu>
    );
  }

  return (
    <Menu.Item key={key} icon={icon} onClick={onClick}>
      <NavLink to={path}>{label}</NavLink>
    </Menu.Item>
  );
}

type TSidebar = {
  label: React.ReactNode | string;
  key: React.Key;
  icon?: React.ReactNode;
  items?: MenuItem[];
  path?: string;
  onClick?: () => any;
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetUserQuery(user?.email);

  const confirm = (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    e!.preventDefault();
    dispatch(logout());
  };

  const cancel = (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    e!.preventDefault();
  };

  const sidebarItems: TSidebar[] | MenuItem = [
    {
      key: "/",
      icon: <DesktopOutlined />,
      label: "Home",
      path: "/",
    },
    {
      key: "/sales",
      icon: <LineChartOutlined />,
      label: "Sales",
      path: "/sales",
    },
    {
      key: "/orders",
      icon: <CheckCircleOutlined />,
      label: "Orders",
      path: "/orders",
    },
    {
      key: "/create",
      icon: <UndoOutlined />,
      label: "Create",
      path: "/create",
    },
    {
      key: "",
      icon: <LogoutOutlined />,
      label: (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            style={{ color: "white", margin: 0, padding: 0 }}
            type="text"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Logout
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const items = sidebarItems.map((item: any) => getItem(item));
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ zIndex: 999, background: "#233E43" }}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div style={{ marginTop: "40px", marginBottom:"20px" }}>
        <h1
          style={{
            color: "white",
            textAlign: "center",
            fontSize: collapsed ? "8px" : "20px",
          }}
        >
          ComputerZone
        </h1>
        <p
          style={{
            color: "white",
            marginTop:"10px ",
            textAlign: "center",
            fontSize: collapsed ? "8px" : "16px",
          }}
        >
          <SmileFilled /> Hi!{" "}
          {data?.data?.name.length > 6
            ? data?.data?.name.split(" ")[0]
            : data?.data?.name}
        </p>
      </div>

      <Menu
        style={{ position: "sticky", top: 0, left: 0, background: "#233E43" }}
        theme="dark"
        defaultSelectedKeys={[`${pathname}`]}
        mode="inline"
      >
        {items}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
