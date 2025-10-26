import { Button, Carousel, Row, Col } from 'antd';
import './styles.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <Carousel autoplay dots={true} effect="fade">
        <div>
          <Row className="hero-slide">
            <Col xs={24} md={12} className="hero-text">
              <h1>Khám phá thế giới sách tuyệt vời</h1>
              <p>
                Hàng ngàn cuốn sách hay từ các tác giả nổi tiếng. 
                Mua sách online dễ dàng, giao hàng nhanh chóng.
              </p>
              <div className="hero-buttons">
                <Button type="primary" size="large">Mua ngay</Button>
                <Button size="large" ghost>Xem danh mục</Button>
              </div>
            </Col>
            <Col xs={24} md={12} className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop" 
                alt="Books" 
              />
            </Col>
          </Row>
        </div>

        <div>
          <Row className="hero-slide">
            <Col xs={24} md={12} className="hero-text">
              <h1>Tìm kiếm cuốn sách truyền cảm hứng cho bạn</h1>
              <p>
                Khám phá kho sách đa dạng, phong phú và đầy cảm hứng cho mọi độc giả.
              </p>
              <div className="hero-buttons">
                <Button type="primary" size="large">Khám phá ngay</Button>
                <Button size="large" ghost>Tất cả sách</Button>
              </div>
            </Col>
            <Col xs={24} md={12} className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1470&auto=format&fit=crop" 
                alt="Books Stack" 
              />
            </Col>
          </Row>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
