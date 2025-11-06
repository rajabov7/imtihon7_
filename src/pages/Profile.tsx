import React, { useEffect, useState } from "react";
import { Card, Avatar, Tag, List, Spin, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { profile as mockProfile } from "../data/profile"; 

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

  if (!profile) return <p>Profile data not found.</p>;

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ maxWidth: 800, margin: "0 auto" }}>
        <Row gutter={24} align="middle">
          <Col>
            <Avatar size={120} icon={<UserOutlined />} />
          </Col>
          <Col flex="auto">
            <h2>{profile.first_name} {profile.last_name}</h2>
            <Tag
              color={
                profile.role === "admin"
                  ? "red"
                  : profile.role === "ustoz"
                  ? "blue"
                  : "green"
              }
            >
              {profile.role}
            </Tag>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={12}>
            <List
              header={<b>Courses</b>}
              bordered
              dataSource={profile.courses || []}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col span={12}>
            <List
              header={<b>Groups</b>}
              bordered
              dataSource={profile.groups || []}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
