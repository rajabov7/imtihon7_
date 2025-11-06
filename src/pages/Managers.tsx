import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Space } from "antd";
import { managers as mockManagers } from "../data/managers";

type Manager = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
};

const Managers: React.FC = () => {
  const [data, setData] = useState<Manager[]>(mockManagers);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingManager, setEditingManager] = useState<Manager | null>(null);

  const [form] = Form.useForm<Omit<Manager, "id">>();

  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = mockManagers.filter(
      (m) =>
        m.first_name.toLowerCase().includes(value) ||
        m.last_name.toLowerCase().includes(value) ||
        m.email.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  
  const handleSave = () => {
    form.validateFields().then((values: Omit<Manager, "id">) => {
      if (editingManager) {
        setData(
          data.map((d) =>
            d.id === editingManager.id ? { ...d, ...values } : d
          )
        );
        setEditingManager(null);
      } else {
        const newManager: Manager = {
          id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
          ...values
        };
        setData([...data, newManager]);
      }
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleEdit = (record: Manager) => {
    setEditingManager(record);
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
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Manager) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
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
        <Button
          type="primary"
          onClick={() => {
            setEditingManager(null);
            setIsModalOpen(true);
          }}
        >
          Add Manager
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingManager ? "Edit Manager" : "Add Manager"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingManager(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Managers;
