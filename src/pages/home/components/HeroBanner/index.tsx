
import { Button, Carousel } from 'antd';
import './styles.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <Carousel autoplay>
        <div>
          <div className="hero-slide" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop')` }}>
            <div className="hero-content">
              <h1>Khám phá Thế giới qua Từng trang sách</h1>
              <Button type="primary" size="large" style={{ backgroundColor: '#2563EB' }}>
                Xem Sách Mới Nhất
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="hero-slide" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop')` }}>
            <div className="hero-content">
              <h1>Tìm kiếm Cuốn sách Thay đổi Cuộc đời bạn</h1>
              <Button type="primary" size="large" style={{ backgroundColor: '#2563EB' }}>
                Tìm Sách Ngay
              </Button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
