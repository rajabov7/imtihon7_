import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Space } from "antd";
import { courses as mockCourses } from "../data/courses";

const Courses = () => {
  const [data, setData] = useState(mockCourses);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = mockCourses.filter(
      (c) =>
        c.name.toLowerCase().includes(value) ||
        c.description.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newCourse = { id: data.length + 1, ...values };
      setData([...data, newCourse]);
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by name or description"
          value={searchText}
          onChange={handleSearch}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Course
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title="Add Course"
        open={isModalOpen}
        onOk={handleAdd}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Courses;
