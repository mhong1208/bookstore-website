import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Space,
  Popconfirm,
  notification,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { categoryService } from '../../../api/category.service';
import './styles.css';
import type { ICategory } from '../../../types/category';

const { Title } = Typography;

const CategoryManagementPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách danh mục.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showAddModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (category: ICategory) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const onFinish = async (values: { name: string; description?: string }) => {
    setLoading(true);
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory._id, values);
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật danh mục thành công.',
        });
      } else {
        await categoryService.create(values);
        notification.success({
          message: 'Thành công',
          description: 'Thêm danh mục thành công.',
        });
      }
      fetchCategories(); // Tải lại danh sách
      handleCancel(); // Đóng modal
    } catch (error: any) {
      notification.error({
        message: 'Lỗi',
        description: error?.response?.data?.message || 'Đã có lỗi xảy ra.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (category: ICategory) => {
    setLoading(true);
    try {
      await categoryService.update(category._id, {
        ...category,
        isActive: !category.isActive,
      });
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật trạng thái danh mục thành công.',
      });
      fetchCategories(); // Tải lại danh sách
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể cập nhật trạng thái danh mục.',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Tên Danh Mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <span style={{ color: isActive ? 'green' : 'red' }}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_: any, record: ICategory) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title={`Bạn có chắc muốn ${
              record.isActive ? 'hủy kích hoạt' : 'kích hoạt'
            } danh mục này?`}
            onConfirm={() => handleToggleActive(record)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button
              icon={<DeleteOutlined />}
              danger={record.isActive}
            >
              {record.isActive ? 'Hủy kích hoạt' : 'Kích hoạt'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="header-container">
        <Title level={2}>Quản Lý Danh Mục</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Thêm Danh Mục
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title={editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Tắt footer mặc định
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên Danh Mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingCategory ? 'Lưu Thay Đổi' : 'Tạo Mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagementPage;
