import { Row, Col, Card, Form, Input, Radio, Button, Typography, Space, Avatar, Modal, Badge, Result, Spin } from 'antd';
import { BankOutlined, CreditCardOutlined, MoneyCollectOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './styles.css';
import { useAuth } from '../../context/AuthContext';
import { clearCart, selectCartItems, selectCartTotalPrice } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';
import orderService from '../../api/order.service';
import voucherService from '../../api/voucher.service';

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
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [loadingVoucher, setLoadingVoucher] = useState(false);

  const shippingFee = SHIPPING_FEES[shippingMethod as keyof typeof SHIPPING_FEES];
  const total = subtotal + shippingFee - discount;

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setVoucherError('Vui lòng nhập mã giảm giá.');
      return;
    }
    setLoadingVoucher(true);
    setVoucherError(null);
    try {
      const response = await voucherService.applyVoucher(voucherCode, subtotal);
      setDiscount(response.discountAmount);
      Modal.success({
        title: 'Thành công',
        content: `Áp dụng mã giảm giá thành công! Bạn được giảm ${formatPrice(response.discountAmount)}.`,
      });
    } catch (error: any) {
      setDiscount(0);
      const errorMessage = error.response?.data?.message || 'Mã giảm giá không hợp lệ hoặc không thể áp dụng.';
      setVoucherError(errorMessage);
    } finally {
      setLoadingVoucher(false);
    }
  };

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
      shippingAddress: values.address,
      paymentMethod: values.paymentMethod,
      shippingMethod: values.shippingMethod,
      notes: values.notes,
      subtotal,
      discountAmount: discount,
      voucherCode: discount > 0 ? voucherCode : undefined,
      totalPrice: total,
    };

    try {
      await orderService.createOrder(orderData as any);
      dispatch(clearCart());
      setDiscount(0);
      setVoucherCode('');
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
                <Radio.Group className="payment-method-group"  onChange={(e) => setShippingMethod(e.target.value)}>
                  <Radio value="standard" className="radio-option-payment" >
                      <Text strong>Giao hàng tiêu chuẩn (3-5 ngày) - <Text strong>{formatPrice(SHIPPING_FEES.standard)}</Text></Text>
                  </Radio>
                  <Radio value="express" className="radio-option-payment">
                      <Text strong>Giao hàng nhanh (1-2 ngày) - <Text strong>{formatPrice(SHIPPING_FEES.express)}</Text></Text>
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
            <Spin spinning={loadingVoucher}>
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

                <Form.Item
                  label="Mã giảm giá"
                  help={voucherError && <Text type="danger">{voucherError}</Text>}
                  validateStatus={voucherError ? 'error' : ''}
                  style={{ marginBottom: 0 }}
                >
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      placeholder="Nhập mã giảm giá"
                      value={voucherCode}
                      onChange={(e) => {
                        setVoucherCode(e.target.value);
                        if (voucherError) setVoucherError(null);
                      }}
                      disabled={discount > 0}
                    />
                    <Button
                      type="primary"
                      onClick={handleApplyVoucher}
                      loading={loadingVoucher}
                      disabled={discount > 0}
                    >
                      Áp dụng
                    </Button>
                  </Space.Compact>
                </Form.Item>

                <div className="summary-row">
                  <Text>Tạm tính</Text>
                  <Text>{formatPrice(subtotal)}</Text>
                </div>
                <div className="summary-row">
                  <Text>Phí vận chuyển</Text>
                  <Text>{formatPrice(shippingFee)}</Text>
                </div>
                {discount > 0 && (
                  <div className="summary-row">
                    <Text style={{ color: 'green' }}>Giảm giá</Text>
                    <Text style={{ color: 'green' }}>-{formatPrice(discount)}</Text>
                  </div>
                )}
                <div className="summary-row total-row">
                  <Text strong>Tổng cộng</Text>
                  <Text strong className="total-price">{formatPrice(total)}</Text>
                </div>
                <Button type="primary" htmlType="submit" size="large" block className="complete-order-btn" disabled={cartItems.length === 0}>
                  Hoàn tất đơn hàng
                </Button>
              </Card>
            </Spin>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CheckoutPage;
