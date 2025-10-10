
import { Button, Card, Col, Row } from 'antd';
import './styles.css';

const specialOffers = [
  { id: 1, title: 'Sapiens: Lược Sử Loài Người', discount: '30%', image: 'https://images.unsplash.com/photo-1618666012174-83b441c0fe90?q=80&w=1887&auto=format&fit=crop' },
  { id: 2, title: 'Atomic Habits', discount: '25%', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop' },
];

const SpecialOffers = () => {
  return (
    <div className="special-offers-section">
      <div className="main-offer-banner">
        <div className="offer-content">
          <h2 className="offer-title">Ưu Đãi Không Thể Bỏ Lỡ</h2>
          <p className="offer-description">Giảm giá lên đến 50% cho hàng ngàn đầu sách. Mua ngay hôm nay!</p>
          <Button size="large" type="primary" danger>
            Xem Tất Cả Ưu Đãi
          </Button>
        </div>
      </div>
      <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
        {specialOffers.map(offer => (
          <Col xs={24} sm={12} key={offer.id}>
            <Card hoverable className="offer-card">
              <div className="offer-card-content">
                <img src={offer.image} alt={offer.title} className="offer-image" />
                <div className="offer-details">
                  <div className="discount-badge">{offer.discount} OFF</div>
                  <h3 className="offer-book-title">{offer.title}</h3>
                  <Button type="text" className="shop-now-link">Mua ngay &rarr;</Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SpecialOffers;
