import React, { useState, useEffect } from 'react';
import { Table, Select, notification, Typography, Tag } from 'antd';
import orderService from '../../../api/order.service';
import type { IOrder, OrderStatus } from '../../../types/order';
import { formatPrice } from '../../../common/helpers/formatPrice';
import './style.css';
const { Title } = Typography;
const { Option } = Select;

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách đơn hàng.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật trạng thái đơn hàng thành công.',
      });
      // Refresh the list
      fetchOrders();
    } catch (error: any) {
      notification.error({
        message: 'Lỗi',
        description: error?.response?.data?.message || 'Không thể cập nhật trạng thái.',
      });
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'gold';
      case 'processing':
        return 'blue';
      case 'shipped':
        return 'cyan';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Mã Đơn Hàng',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => <code>{text}</code>,
    },
    {
      title: 'Khách Hàng',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => user?.name || 'Khách vãng lai',
    },
    {
      title: 'Ngày Đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => formatPrice(price),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_: any, record: IOrder) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record._id, value as OrderStatus)}
          disabled={record.status === 'delivered' || record.status === 'cancelled'}
        >
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <div className="header-container">
        <Title level={2}>Quản Lý Đơn Hàng</Title>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="_id"
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: '16px' }}>
              <p><strong>Địa chỉ giao hàng:</strong> {`${record.shippingAddress.address}, ${record.shippingAddress.city}`}</p>
              <p><strong>Ghi chú:</strong> {record.notes || 'Không có'}</p>
              <p><strong>Sản phẩm:</strong></p>
              <ul>
                {record.orderItems.map((item: any) => (
                  <li key={item.book}>
                    {item.title} - {item.quantity} x {formatPrice(item.price)}
                  </li>
                ))}
              </ul>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default OrderManagementPage;