import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Space } from "antd";
import { teachers as mockTeachers } from "../data/teachers";

type Teacher = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  field: string;
};

const Teachers: React.FC = () => {
  const [data, setData] = useState<Teacher[]>(mockTeachers);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [form] = Form.useForm<Omit<Teacher, "id">>();

  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = mockTeachers.filter(
      (t) =>
        t.first_name.toLowerCase().includes(value) ||
        t.last_name.toLowerCase().includes(value) ||
        t.email.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  
  const handleSave = () => {
    form.validateFields().then((values: Omit<Teacher, "id">) => {
      if (editingTeacher) {
        setData(
          data.map((d) => (d.id === editingTeacher.id ? { ...d, ...values } : d))
        );
        setEditingTeacher(null);
      } else {
        const newTeacher: Teacher = {
          id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
          ...values
        };
        setData([...data, newTeacher]);
      }
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleEdit = (record: Teacher) => {
    setEditingTeacher(record);
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
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Field", dataIndex: "field", key: "field" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Teacher) => (
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
        <Button type="primary" onClick={() => { setEditingTeacher(null); setIsModalOpen(true); }}>
          Add Teacher
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => { setIsModalOpen(false); setEditingTeacher(null); }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Field" name="field" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Field" name="field" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;
