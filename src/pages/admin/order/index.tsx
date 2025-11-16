import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Typography,
  Button,
  Space,
  notification,
  Modal,
  Timeline,
  Input,
  Select,
  DatePicker,
} from 'antd';

import orderService from '../../../api/order.service';
import type { IOrder, OrderStatus } from '../../../types/order';
import { formatPrice } from '../../../common/helpers/formatPrice';
import './style.css';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const statusButtons: OrderStatus[] = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

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

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<any>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getAllOrders();
      const sorted = response.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setOrders(sorted);
      setFilteredOrders(sorted);
    } catch {
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

  // HANDLE STATUS UPDATE
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      notification.success({
        message: 'Thành công',
        description: 'Cập nhật trạng thái đơn hàng thành công.',
      });
      fetchOrders();
    } catch (error: any) {
      notification.error({
        message: 'Lỗi',
        description:
          error?.response?.data?.message || 'Không thể cập nhật trạng thái.',
      });
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };


  // FILTER FUNCTION
  const applyFilters = () => {
    let filtered = [...orders];

    // Filter by search
    // if (searchText.trim()) {
    //   filtered = filtered.filter(
    //     (o) =>
    //       o._id.includes(searchText.trim()) ||
    //       o.user?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    //       o.user?.email?.toLowerCase().includes(searchText.toLowerCase())
    //   );
    // }

    // Filter by status
    if (filterStatus) {
      filtered = filtered.filter((o) => o.status === filterStatus);
    }

    // Filter by date range
    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter((o) => {
        const created = new Date(o.createdAt).getTime();
        return created >= start.startOf('day').valueOf() && created <= end.endOf('day').valueOf();
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchText, filterStatus, dateRange, orders]);

  // COLUMNS
  const columns = [
    {
      title: 'Mã Đơn Hàng',
      dataIndex: '_id',
      render: (text: string, record: IOrder) => (
        <Button type="link" onClick={() => openDetailModal(record)}>
          {'#' + text}
        </Button>
      ),
    },
    {
      title: 'Khách Hàng',
      dataIndex: 'user',
      render: (user: any) => user?.name || 'Khách vãng lai',
    },
    {
      title: 'Ngày Đặt',
      dataIndex: 'createdAt',
      render: (text: string) =>
        new Date(text).toLocaleString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalPrice',
      render: (price: number) => formatPrice(price),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      render: (status: OrderStatus) => (
        <Tag color={getStatusColor(status)}>
          {getStatusLabel(status)}
        </Tag>
      )

    },
    {
      title: 'Hành Động',
      render: (_: any, record: IOrder) => {
        const current = record.status;

        let availableActions: OrderStatus[] = [];

        if (current === 'pending') {
          availableActions = ['processing', 'cancelled'];
        } 
        else if (current === 'processing') {
          availableActions = ['shipped', 'cancelled'];
        }
        else if (current === 'shipped') {
          availableActions = ['delivered'];
        }
        else {
          // delivered hoặc cancelled => Không có hành động
          return <Tag color="gray">Không có hành động</Tag>;
        }

        return (
          <Space>
            {availableActions.map((st) => (
              <Button
                key={st}
                type="primary"
                danger={st === 'cancelled'}
                onClick={() => handleStatusChange(record._id, st)}
              >
                {getStatusLabel(st)}
              </Button>

            ))}
          </Space>
        );
      }
    }

  ];

  // MODAL HANDLERS
  const openDetailModal = (order: IOrder) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeDetailModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="header-container">
        <Title level={2}>Quản Lý Đơn Hàng</Title>
      </div>

      {/* Search & Filters */}
      <Space style={{ marginBottom: 20, width: '100%'}} align='start'>
        <Input.Search
          placeholder="Tìm theo mã đơn / khách hàng / email"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 260 }}
        />

        <Select
          placeholder="Lọc theo trạng thái"
          allowClear
          style={{ width: 180 }}
          onChange={(value) => setFilterStatus(value)}
        >
          {statusButtons.map((st) => (
            <Select.Option value={st} key={st}>
              {st.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      </Space>

      {/* TABLE */}
      <Table
        columns={columns}
        dataSource={filteredOrders}
        loading={loading}
        rowKey="_id"
      />

      {/* ORDER DETAIL MODAL */}
      <Modal
        visible={modalVisible}
        onCancel={closeDetailModal}
        footer={null}
        width={750}
        title={`Chi tiết đơn hàng #${selectedOrder?._id}`}
      >
        {selectedOrder && (
          <div style={{ lineHeight: '28px' }}>
            <h3>📦 Khách hàng</h3>
            {/* <p>
              <strong>{selectedOrder.user?.name}</strong> (
              {selectedOrder.user?.email})
            </p> */}

            <h3>🚚 Địa chỉ giao hàng</h3>
            <p>
              {selectedOrder.shippingAddress.address},{' '}
              {selectedOrder.shippingAddress.city},{' '}
              {selectedOrder.shippingAddress.postalCode},{' '}
              {selectedOrder.shippingAddress.country}
            </p>

            <h3>📦 Trạng thái đơn hàng</h3>
            <Tag color={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Tag>

            <h3>🛒 Sản phẩm</h3>
            <ul>
              {selectedOrder.orderItems.map((item) => (
                <li key={item._id}>
                  <strong>{item.book.title}</strong> — {item.quantity} ×{' '}
                  {formatPrice(item.price)} →{' '}
                  <strong>{formatPrice(item.quantity * item.price)}</strong>
                </li>
              ))}
            </ul>

            <h3>💰 Thanh toán</h3>
            <p>
              <strong>Tạm tính:</strong> {formatPrice(selectedOrder.subtotal)}
            </p>
            <p>
              <strong>Giảm giá:</strong>{' '}
              {formatPrice(selectedOrder.discountAmount)}
            </p>
            <p>
              <strong>Thành tiền:</strong>{' '}
              <Tag color="green">{formatPrice(selectedOrder.totalPrice)}</Tag>
            </p>
            <p>
              <strong>Thanh toán:</strong>{' '}
              {selectedOrder.isPaid ? (
                <Tag color="green">Đã thanh toán</Tag>
              ) : (
                <Tag color="red">Chưa thanh toán</Tag>
              )}
            </p>

            <h3>📝 Ghi chú</h3>
            <p>{selectedOrder.notes || 'Không có'}</p>

            <h3>⏱ Thời gian</h3>
            <p>
              <strong>Ngày đặt:</strong>{' '}
              {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagementPage;
