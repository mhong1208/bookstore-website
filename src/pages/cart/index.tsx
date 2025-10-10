
import { Table, Button, Input, Space, Typography, Row, Col, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const { Title, Text } = Typography;

// Placeholder data
const cartData = [
  {
    key: '1',
    product: {
      id: 1,
      name: 'Lược sử loài người',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop',
    },
    price: 150000,
    quantity: 1,
  },
  {
    key: '2',
    product: {
      id: 2,
      name: 'Nhà giả kim',
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1887&auto=format&fit=crop',
    },
    price: 80000,
    quantity: 2,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const CartPage = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (product: any) => (
        <Space>
          <img src={product.image} alt={product.name} style={{ width: 60, height: 90, objectFit: 'cover' }} />
          <Text>{product.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <Text>{formatPrice(price)}</Text>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => <Input type="number" min={1} defaultValue={quantity} style={{ width: 60 }} />,
    },
    {
      title: 'Tạm tính',
      key: 'total',
      render: (_: any, record: any) => <Text>{formatPrice(record.price * record.quantity)}</Text>,
    },
    {
      title: 'Xóa',
      key: 'action',
      render: () => (
        <Button type="text" danger icon={<DeleteOutlined />} />
      ),
    },
  ];

  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Placeholder
  const total = subtotal + shipping;

  return (
    <div className="cart-page-container">
      <Title level={2} className="cart-page-title">Giỏ Hàng Của Bạn</Title>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Table columns={columns} dataSource={cartData} pagination={false} />
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Tổng Kết Đơn Hàng">
            <div className="summary-row">
              <Text>Tạm tính</Text>
              <Text>{formatPrice(subtotal)}</Text>
            </div>
            <div className="summary-row">
              <Text>Phí vận chuyển</Text>
              <Text>{formatPrice(shipping)}</Text>
            </div>
            <div className="summary-row total-row">
              <Text strong>Tổng cộng</Text>
              <Text strong>{formatPrice(total)}</Text>
            </div>
            <Input.Search
              placeholder="Nhập mã giảm giá"
              enterButton="Áp dụng"
              size="large"
              className="coupon-input"
            />
            <Button type="primary" size="large" block className="checkout-btn" onClick={handleCheckout}>
              Tiến hành thanh toán
            </Button>
            <Button type="link" block className="continue-shopping-btn">
              Tiếp tục mua sắm
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
