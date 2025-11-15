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
  Select,
  InputNumber,
  DatePicker,
  Switch,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { voucherService } from '../../../api/voucher.service';
import type { IVoucher } from '../../../types/voucher';
import moment from 'moment';
import './styles.css';

const { Title } = Typography;
const { Option } = Select;

const VoucherManagementPage: React.FC = () => {
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<IVoucher | null>(null);
  const [form] = Form.useForm();

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await voucherService.getAll();
      setVouchers(response.data);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách voucher.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const showAddModal = () => {
    setEditingVoucher(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, discountType: 'percentage' });
    setIsModalVisible(true);
  };

  const showEditModal = (voucher: IVoucher) => {
    setEditingVoucher(voucher);
    form.setFieldsValue({
      ...voucher,
      expiresAt: moment(voucher.expiresAt),
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingVoucher(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const payload = {
      ...values,
      expiresAt: values.expiresAt.toISOString(),
    };

    try {
      if (editingVoucher) {
        await voucherService.update(editingVoucher._id, payload);
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật voucher thành công.',
        });
      } else {
        await voucherService.create(payload);
        notification.success({
          message: 'Thành công',
          description: 'Thêm voucher thành công.',
        });
      }
      fetchVouchers();
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

  const handleToggleActive = async (voucher: IVoucher) => {
    setLoading(true);
    try {
      await voucherService.update(voucher._id, {
        isActive: !voucher.isActive,
      });
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật trạng thái voucher thành công.',
      });
      fetchVouchers();
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể cập nhật trạng thái voucher.',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Mã Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Loại Giảm Giá',
      dataIndex: 'discountType',
      key: 'discountType',
      render: (type: string) => (type === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định'),
    },
    {
      title: 'Giá Trị',
      dataIndex: 'discountValue',
      key: 'discountValue',
    },
    {
      title: 'Ngày Hết Hạn',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (date: string) => moment(date).format('DD/MM/YYYY'),
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
      render: (_: any, record: IVoucher) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title={`Bạn có chắc muốn ${record.isActive ? 'hủy kích hoạt' : 'kích hoạt'} voucher này?`}
            onConfirm={() => handleToggleActive(record)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button danger={record.isActive}>
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
        <Title level={2}>Quản Lý Voucher</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Thêm Voucher
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={vouchers}
        loading={loading}
        rowKey="_id"
        scroll={{ x: true }}
      />
      <Modal
        title={editingVoucher ? 'Chỉnh Sửa Voucher' : 'Thêm Voucher Mới'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ isActive: true, discountType: 'percentage' }}>
          <Form.Item name="code" label="Mã Voucher" rules={[{ required: true, message: 'Vui lòng nhập mã voucher!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="discountType" label="Loại Giảm Giá" rules={[{ required: true }]}>
            <Select>
              <Option value="percentage">Phần trăm</Option>
              <Option value="fixed">Số tiền cố định</Option>
            </Select>
          </Form.Item>
          <Form.Item name="discountValue" label="Giá Trị Giảm" rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="minOrderAmount" label="Đơn Hàng Tối Thiểu">
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="expiresAt" label="Ngày Hết Hạn" rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="maxUsage" label="Số Lần Sử Dụng Tối Đa">
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item name="isActive" label="Trạng Thái" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingVoucher ? 'Lưu Thay Đổi' : 'Tạo Mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VoucherManagementPage;
