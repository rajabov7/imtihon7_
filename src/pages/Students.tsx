import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Space } from "antd";
import { students as mockStudents } from "../data/students";

type Student = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  group_count: number;
};

const Students: React.FC = () => {
  const [data, setData] = useState<Student[]>(mockStudents);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [form] = Form.useForm<Omit<Student, "id">>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = mockStudents.filter(
      (s) =>
        s.first_name.toLowerCase().includes(value) ||
        s.last_name.toLowerCase().includes(value) ||
        s.phone.includes(value)
    );
    setData(filtered);
  };

  const handleSave = () => {
    form.validateFields().then((values: Omit<Student, "id">) => {
      if (editingStudent) {
        setData(
          data.map((d) => (d.id === editingStudent.id ? { ...d, ...values } : d))
        );
        setEditingStudent(null);
      } else {
        const newStudent: Student = {
          id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
          ...values
        };
        setData([...data, newStudent]);
      }
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleEdit = (record: Student) => {
    setEditingStudent(record);
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
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Group Count", dataIndex: "group_count", key: "group_count" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Student) => (
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
          placeholder="Search by name or phone"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 250 }}
        />
        <Button type="primary" onClick={() => { setEditingStudent(null); setIsModalOpen(true); }}>
          Add Student
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingStudent ? "Edit Student" : "Add Student"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => { setIsModalOpen(false); setEditingStudent(null); }}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Group Count" name="group_count" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
