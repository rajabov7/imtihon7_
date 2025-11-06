import React, { useState } from "react";
import { Layout, Menu, Avatar, Card, Tag, List } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  ReadOutlined,
  BookOutlined,
  ProfileOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: "/managers", label: "Managers", icon: <TeamOutlined /> },
    { key: "/admins", label: "Admins", icon: <UserOutlined /> },
    { key: "/teachers", label: "Teachers", icon: <ReadOutlined /> },
    { key: "/students", label: "Students", icon: <BookOutlined /> },
    { key: "/courses", label: "Courses", icon: <BookOutlined /> },
    { key: "/profile", label: "Profile", icon: <ProfileOutlined /> },
    { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
  ];

  const handleMenuClick = (item: any) => {
    if (item.key === "logout") {
      logout();
      navigate("/login");
    } else {
      navigate(item.key);
    }
  };

  const profileCard = (
    <Card>
      <Avatar size={100} icon={<UserOutlined />} />
      <h3 style={{ marginTop: "16px" }}>{user?.email}</h3>
      <Tag color={user?.role === "admin" ? "red" : user?.role === "ustoz" ? "blue" : "green"}>
        {user?.role}
      </Tag>

      <List
        size="small"
        header={<b>Courses</b>}
        dataSource={["Backend dasturlash", "Fullstack", "Frontend dasturlash"]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        style={{ marginTop: "16px" }}
      />
    </Card>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="dark">
        <div style={{ color: "white", padding: 16, fontWeight: "bold" }}>
          {collapsed ? "CRM" : "Admin CRM"}
        </div>
        <Menu
          mode="inline"
          theme="dark"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#001529", height: 0 }} />

        <Layout>
        
          <Content style={{ padding: 24, background: "#f0f2f5", flex: 1 }}>
            <Outlet />
          </Content>
          <Sider width={250} theme="light" style={{ background: "#fff" }}>
            {profileCard}
          </Sider>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
