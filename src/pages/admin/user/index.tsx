import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Typography,
  Space,
  Popconfirm,
  notification,
  Select,
  Switch,
  Avatar,
} from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { userService } from '../../../api/user.service';
import type { IUser } from '../../../types/user';
import { EUser } from '../../../common/enums/EUser';
import './styles.css';

const { Title } = Typography;
const { Option } = Select;

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách người dùng.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showEditModal = (user: IUser) => {
    setEditingUser(user);
    form.setFieldsValue({
      role: user.role,
      isActive: user.isActive,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const onFinish = async (values: { role: EUser; isActive: boolean }) => {
    if (!editingUser) return;

    setLoading(true);
    try {
      await userService.update(editingUser._id, values);
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật người dùng thành công.',
      });
      fetchUsers();
      handleCancel();
    } catch (error: any) {
      notification.error({
        message: 'Lỗi',
        description: error?.response?.data?.message || 'Đã có lỗi xảy ra.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (user: IUser) => {
    setLoading(true);
    try {
      await userService.update(user._id, { isActive: !user.isActive });
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật trạng thái người dùng thành công.',
      });
      fetchUsers();
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể cập nhật trạng thái người dùng.',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (avatarUrl: string, record: IUser) => (
        <Avatar src={avatarUrl} icon={<UserOutlined />}>
          {avatarUrl ? '' : record.name.charAt(0).toUpperCase()}
        </Avatar>
      ),
    },
    {
      title: 'Tên Người Dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai Trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <span style={{ color: isActive ? 'green' : 'red' }}>
          {isActive ? 'Hoạt động' : 'Bị khóa'}
        </span>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_: any, record: IUser) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title={`Bạn có chắc muốn ${record.isActive ? 'khóa' : 'mở khóa'} tài khoản này?`}
            onConfirm={() => handleToggleActive(record)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button danger={record.isActive}>
              {record.isActive ? 'Khóa' : 'Mở khóa'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="header-container">
        <Title level={2}>Quản Lý Người Dùng</Title>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id"
        scroll={{ x: true }}
      />
      <Modal
        title={`Chỉnh Sửa Người Dùng: ${editingUser?.name}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="role" label="Vai Trò" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
            <Select>
              <Option value={EUser.ADMIN}>Admin</Option>
              <Option value={EUser.STAFF}>Staff</Option>
              <Option value={EUser.CUSTOMER}>Customer</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isActive" label="Trạng Thái" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Lưu Thay Đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
