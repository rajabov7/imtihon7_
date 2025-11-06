import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Space } from "antd";
import { admins as mockAdmins } from "../data/admins";

type Admin = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
  work_date: string;
};

const Admins: React.FC = () => {
  const [data, setData] = useState<Admin[]>(mockAdmins);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  const [form] = Form.useForm<Omit<Admin, "id">>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = mockAdmins.filter(
      (a) =>
        a.first_name.toLowerCase().includes(value) ||
        a.last_name.toLowerCase().includes(value) ||
        a.email.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  const handleSave = () => {
    form.validateFields().then((values: Omit<Admin, "id">) => {
      if (editingAdmin) {
        setData(
          data.map((d) => (d.id === editingAdmin.id ? { ...d, ...values } : d))
        );
        setEditingAdmin(null);
      } else {
        const newAdmin: Admin = {
          id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
          ...values
        };
        setData([...data, newAdmin]);
      }
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleEdit = (record: Admin) => {
    setEditingAdmin(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((d) => d.id !== id));
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Work Date", dataIndex: "work_date", key: "work_date" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Admin) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by name or email"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 250 }}
        />
        <Button type="primary" onClick={() => { setEditingAdmin(null); setIsModalOpen(true); }}>
          Add Admin
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingAdmin ? "Edit Admin" : "Add Admin"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => { setIsModalOpen(false); setEditingAdmin(null); }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Work Date" name="work_date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Work Date" name="work_date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Work Date" name="work_date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admins;
