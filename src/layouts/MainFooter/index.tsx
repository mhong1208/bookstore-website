import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './styles.css'; 

const { Footer } = Layout;
const { Title, Text, Link: AntLink } = Typography;

const MainFooter = () => {
  return (
    <Footer className="site-footer">
      <div className="footer-container">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={8}>
            <div className="footer-logo">
              <Title level={4} className="footer-logo-text">BookStore</Title>
            </div>
            <Text className="footer-text">
              Cửa hàng sách trực tuyến hàng đầu với hàng ngàn cuốn sách hay từ các tác giả nổi tiếng.
            </Text>
          </Col>

          <Col xs={12} sm={12} md={4}>
            <Title level={5} className="footer-title">Liên kết nhanh</Title>
            <Link to="/" className="footer-link">Trang chủ</Link>
            <Link to="/products" className="footer-link">Danh mục</Link>
            <Link to="/about" className="footer-link">Về chúng tôi</Link>
            <Link to="/contact" className="footer-link">Liên hệ</Link>
          </Col>

          <Col xs={12} sm={12} md={6}>
            <Title level={5} className="footer-title">Chính sách</Title>
            <Link to="/terms" className="footer-link">Điều khoản sử dụng</Link>
            <Link to="/privacy" className="footer-link">Chính sách bảo mật</Link>
            <Link to="/returns" className="footer-link">Chính sách hoàn trả</Link>
            <Link to="/shipping" className="footer-link">Vận chuyển</Link>
          </Col>

          <Col xs={24} sm={24} md={6}>
            <Title level={5} className="footer-title">Liên hệ</Title>
            <Space direction="vertical" size="middle" className="footer-contact">
              <AntLink href="tel:19001234" className="footer-link">
                <PhoneOutlined /> 1900 1234
              </AntLink>
              <AntLink href="mailto:info@bookstore.com" className="footer-link">
                <MailOutlined /> info@bookstore.com
              </AntLink>
              <Text className="footer-link-static">
                <EnvironmentOutlined /> 123 Đường ABC, TP. HCM
              </Text>
            </Space>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <Row justify="space-between" align="middle" className="footer-bottom-bar">
          <Col xs={24} sm={12}>
            <Text className="footer-text">
              © 2025 BookStore. Tất cả quyền được bảo lưu.
            </Text>
          </Col>
          <Col xs={24} sm={12}>
            <Space size="middle" className="footer-social-links">
              <AntLink href="https://facebook.com" target="_blank" className="footer-link">
                Facebook
              </AntLink>
              <AntLink href="https://instagram.com" target="_blank" className="footer-link">
                Instagram
              </AntLink>
              <AntLink href="https://twitter.com" target="_blank" className="footer-link">
                Twitter
              </AntLink>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default MainFooter;