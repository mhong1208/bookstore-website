import { Row, Col, Card, Form, Input, Radio, Button, Typography, Space, Avatar, Modal, Badge, Result } from 'antd';
import { BankOutlined, CreditCardOutlined, MoneyCollectOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './styles.css';
import { useAuth } from '../../context/AuthContext';
import { clearCart, selectCartItems, selectCartTotalPrice } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';
import orderService from '../../api/order.service';

const { Title, Text } = Typography;

const SHIPPING_FEES = {
  standard: 15000,
  express: 30000,
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotalPrice);

  const [shippingMethod, setShippingMethod] = useState('standard');
  const shippingFee = SHIPPING_FEES[shippingMethod as keyof typeof SHIPPING_FEES];
  const total = subtotal + shippingFee;

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleOrderComplete = async (values: any) => {
    if (!user) {
      Modal.error({
        title: 'Lỗi',
        content: 'Vui lòng đăng nhập để hoàn tất đơn hàng.',
      });
      return;
    }

    const orderData = {
      user: user.id,
      orderItems: cartItems.map(item => ({
        book: item.id,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
        image: item.coverImage
      })),
      shippingAddress: {
        address: values.address,
        city: 'Default City', // You might want to add city, postalCode, country fields to your form
        postalCode: '00000',
        country: 'Vietnam',
      },
      paymentMethod: values.paymentMethod,
      shippingMethod: values.shippingMethod,
      notes: values.notes,
      subtotal,
      totalPrice: total,
    };

    try {
      await orderService.createOrder(orderData);
      dispatch(clearCart());
      Modal.success({
        title: 'Đặt hàng thành công!',
        content: 'Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất.',
        onOk() {
          navigate('/');
        },
      });
    } catch (error) {
      console.error('Failed to create order:', error);
      Modal.error({
        title: 'Đặt hàng thất bại',
        content: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      });
    }
  };

  if (cartItems.length === 0) {
    return (
        <div className="checkout-page-container">
            <Result
                icon={<ShoppingCartOutlined />}
                title="Giỏ hàng của bạn đang trống"
                extra={<Link to="/shop"><Button type="primary">Bắt đầu mua sắm</Button></Link>}
            />
        </div>
    )
  }

  return (
    <div className="checkout-page-container">
      <Title level={2} className="checkout-page-title">Thanh Toán</Title>
      <Form form={form} layout="vertical" onFinish={handleOrderComplete}>
        <Row gutter={[32, 32]}>
          {/* Left Column: Shipping & Payment */}
          <Col xs={24} lg={14}>
            <Card title="Thông tin giao hàng" className="checkout-card">
              <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                <Input size="large" />
              </Form.Item>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item name="notes" label="Ghi chú">
                <Input.TextArea rows={2} placeholder="Ghi chú cho người bán..." />
              </Form.Item>
            </Card>

            <Card title="Phương thức vận chuyển" className="checkout-card">
              <Form.Item name="shippingMethod" initialValue="standard">
                <Radio.Group onChange={(e) => setShippingMethod(e.target.value)}>
                  <Radio value="standard" className="radio-option">
                    <div>
                      <Text strong>Giao hàng tiêu chuẩn</Text>
                      <Text type="secondary" style={{ display: 'block' }}>Dự kiến 3-5 ngày</Text>
                    </div>
                    <Text strong>{formatPrice(SHIPPING_FEES.standard)}</Text>
                  </Radio>
                  <Radio value="express" className="radio-option">
                    <div>
                      <Text strong>Giao hàng nhanh</Text>
                      <Text type="secondary" style={{ display: 'block' }}>Dự kiến 1-2 ngày</Text>
                    </div>
                    <Text strong>{formatPrice(SHIPPING_FEES.express)}</Text>
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Card>

            <Card title="Phương thức thanh toán" className="checkout-card">
              <Form.Item name="paymentMethod" initialValue="cod">
                <Radio.Group className="payment-method-group">
                  <Radio value="cod" className="radio-option-payment">
                    <MoneyCollectOutlined /> Thanh toán khi nhận hàng (COD)
                  </Radio>
                  <Radio value="bank" className="radio-option-payment" disabled>
                    <BankOutlined /> Chuyển khoản ngân hàng (Bảo trì)
                  </Radio>
                  <Radio value="wallet" className="radio-option-payment" disabled>
                    <CreditCardOutlined /> Ví điện tử (Bảo trì)
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Card>
          </Col>

          {/* Right Column: Order Summary */}
          <Col xs={24} lg={10}>
            <Card title="Tóm tắt đơn hàng" className="summary-card">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <Space align="start">
                    <Badge count={item.quantity}>
                      <Avatar shape="square" src={item.coverImage} size={64} />
                    </Badge>
                    <div className="item-details">
                      <Text strong>{item.title}</Text>
                      <Text type="secondary">{formatPrice(item.price)}</Text>
                    </div>
                  </Space>
                  <Text strong>{formatPrice(item.price * item.quantity)}</Text>
                </div>
              ))}
              <div className="summary-row">
                <Text>Tạm tính</Text>
                <Text>{formatPrice(subtotal)}</Text>
              </div>
              <div className="summary-row">
                <Text>Phí vận chuyển</Text>
                <Text>{formatPrice(shippingFee)}</Text>
              </div>
              <div className="summary-row total-row">
                <Text strong>Tổng cộng</Text>
                <Text strong className="total-price">{formatPrice(total)}</Text>
              </div>
              <Button type="primary" htmlType="submit" size="large" block className="complete-order-btn" disabled={cartItems.length === 0}>
                Hoàn tất đơn hàng
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CheckoutPage;
