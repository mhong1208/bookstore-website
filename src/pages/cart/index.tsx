import { Table, Button, Input, Space, Typography, Row, Col, Card, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import type { CartItem } from '../../redux/cartSlice';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  updateQuantity,
} from '../../redux/cartSlice';

const { Title, Text } = Typography;

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (_: any, record: CartItem) => (
        <Space>
          <img src={record.image} alt={record.title} style={{ width: 60, height: 90, objectFit: 'cover' }} />
          <Text>{record.title}</Text>
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
      render: (_: any, record: CartItem) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value || 1)}
          style={{ width: 60 }}
        />
      ),
    },
    {
      title: 'Tạm tính',
      key: 'total',
      render: (_: any, record: CartItem) => <Text>{formatPrice(record.price * record.quantity)}</Text>,
    },
    {
      title: 'Xóa',
      key: 'action',
      render: (_: any, record: CartItem) => (
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)} />
      ),
    },
  ];

  const shipping = 0; // Placeholder

  return (
    <div className="cart-page-container">
      <Title level={2} className="cart-page-title">Giỏ Hàng Của Bạn</Title>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Table columns={columns} dataSource={cartItems} pagination={false} rowKey="id" />
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Tổng Kết Đơn Hàng">
            <div className="summary-row">
              <Text>Tạm tính</Text>
              <Text>{formatPrice(totalPrice)}</Text>
            </div>
            <div className="summary-row">
              <Text>Phí vận chuyển</Text>
              <Text>{formatPrice(shipping)}</Text>
            </div>
            <div className="summary-row total-row">
              <Text strong>Tổng cộng</Text>
              <Text strong>{formatPrice(totalPrice + shipping)}</Text>
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
            <Button type="link" block className="continue-shopping-btn" onClick={() => navigate('/')}>
              Tiếp tục mua sắm
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
