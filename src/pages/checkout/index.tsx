
import { Row, Col, Card, Form, Input, Radio, Button, Typography, Space, Avatar, Modal, Badge } from 'antd';
import { BankOutlined, CreditCardOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const { Title, Text } = Typography;

// Placeholder data
const orderItems = [
  { id: 1, name: 'Lược sử loài người', quantity: 1, price: 150000, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Nhà giả kim', quantity: 2, price: 80000, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1887&auto=format&fit=crop' },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleOrderComplete = (values: any) => {
    console.log('Form Values:', values);
    Modal.success({
      title: 'Đặt hàng thành công!',
      content: 'Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất.',
      onOk() {
        navigate('/');
      },
    });
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 15000; // Placeholder
  const total = subtotal + shippingFee;

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
            </Card>

            <Card title="Phương thức vận chuyển" className="checkout-card">
              <Form.Item name="shippingMethod" initialValue="standard">
                <Radio.Group>
                  <Radio value="standard" className="radio-option">
                    <div>
                      <Text strong>Giao hàng tiêu chuẩn</Text>
                      <Text type="secondary" style={{ display: 'block' }}>Dự kiến 3-5 ngày</Text>
                    </div>
                    <Text strong>{formatPrice(shippingFee)}</Text>
                  </Radio>
                  <Radio value="express" className="radio-option">
                    <div>
                      <Text strong>Giao hàng nhanh</Text>
                      <Text type="secondary" style={{ display: 'block' }}>Dự kiến 1-2 ngày</Text>
                    </div>
                    <Text strong>{formatPrice(30000)}</Text>
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
                  <Radio value="bank" className="radio-option-payment">
                    <BankOutlined /> Chuyển khoản ngân hàng
                  </Radio>
                  <Radio value="wallet" className="radio-option-payment">
                    <CreditCardOutlined /> Ví điện tử
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Card>
          </Col>

          {/* Right Column: Order Summary */}
          <Col xs={24} lg={10}>
            <Card title="Tóm tắt đơn hàng" className="summary-card">
              {orderItems.map(item => (
                <div key={item.id} className="summary-item">
                  <Space align="start">
                    <Badge count={item.quantity}>
                      <Avatar shape="square" src={item.image} size={64} />
                    </Badge>
                    <div className="item-details">
                      <Text strong>{item.name}</Text>
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
              <Button type="primary" htmlType="submit" size="large" block className="complete-order-btn">
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
