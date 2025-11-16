import { Row, Col, Tag, Table, Divider } from 'antd';
import type { IOrder } from '../../../../types/order';
import { formatPrice } from '../../../../common/helpers/formatPrice';

interface OrderDetailProps {
  order: IOrder;
}

const SHIPPING_FEES: Record<string, number> = {
  standard: 15000,
  express: 30000,
};

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  if (!order) return null;

  // Lấy phí vận chuyển dựa trên phương thức
  const shippingFee = SHIPPING_FEES[order.shippingMethod] || 0;

  // Table columns for order items
  const itemColumns = [
    {
      title: 'Sách',
      dataIndex: ['book', 'title'],
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => formatPrice(price),
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (_: any, record: any) => formatPrice(record.quantity * record.price),
    },
  ];

  return (
    <div>
      {/* Khách hàng & Trạng thái */}
      <Row gutter={16}>
        <Col span={12}>
          <h3>📦 Khách hàng</h3>
          <p><strong>Tên:</strong> {order.user?.name || 'Khách vãng lai'}</p>
          <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
        </Col>
        <Col span={12}>
          <h3>🚚 Trạng thái đơn hàng</h3>
          <Tag color={
            order.status === 'pending' ? 'gold' :
            order.status === 'processing' ? 'blue' :
            order.status === 'shipped' ? 'cyan' :
            order.status === 'delivered' ? 'green' :
            'red'
          }>
            {order.status.toUpperCase()}
          </Tag>
        </Col>
      </Row>

      <Divider />

      {/* Địa chỉ giao hàng */}
      <Row gutter={16}>
        <Col span={24}>
          <h3>📍 Địa chỉ giao hàng</h3>
          <p>{order.shippingAddress}</p>
        </Col>
      </Row>

      <Divider />

      {/* Sản phẩm */}
      <Row gutter={16}>
        <Col span={24}>
          <h3>🛒 Sản phẩm</h3>
          <Table
            columns={itemColumns}
            dataSource={order.orderItems}
            rowKey="_id"
            pagination={false}
            size="small"
          />
        </Col>
      </Row>

      <Divider />

      {/* Thanh toán */}
      <Row gutter={16}>
        <Col span={12}>
          <h3>💰 Thanh toán</h3>
          <p><strong>Tạm tính:</strong> {formatPrice(order.subtotal)}</p>
          <p><strong>Phí vận chuyển ({order.shippingMethod}):</strong> {formatPrice(shippingFee)}</p>
          <p><strong>Giảm giá:</strong> {formatPrice(order.discountAmount)}</p>
          <p>
            <strong>Thành tiền:</strong>{' '}
            <Tag color="green">{formatPrice(order.totalPrice)}</Tag>
          </p>
          <p>
            <strong>Thanh toán:</strong>{' '}
            {order.isPaid ? <Tag color="green">Đã thanh toán</Tag> : <Tag color="red">Chưa thanh toán</Tag>}
          </p>
        </Col>

        <Col span={12}>
          <h3>📝 Ghi chú</h3>
          <p>{order.notes || 'Không có'}</p>
        </Col>
      </Row>

      <Divider />

      {/* Thời gian */}
      <Row gutter={16}>
        <Col span={12}>
          <h3>⏱ Thời gian</h3>
          <p><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
          <p><strong>Ngày cập nhật:</strong> {new Date(order.updatedAt).toLocaleString('vi-VN')}</p>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetail;
