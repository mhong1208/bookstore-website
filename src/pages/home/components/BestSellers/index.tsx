
import { Card, Carousel, Button, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Text } = Typography;
 interface BestSellersProps {
  data: any[];
 }

const BookCard = ({ book, onClick }: any) => (
  <Card
    hoverable
    className="book-card"
    cover={<img alt={book.title} src={book.image} className="book-cover-img" />}
    actions={[
      <Button type="primary" size="large" icon={<ShoppingCartOutlined />} className="add-to-cart-btn">
        Thêm vào giỏ
      </Button>
    ]}
    onClick={onClick}
  >
    <Meta title={book.title} description={book.author} />
    <div className="book-price">
      <span className="current-price">{book.price}</span>
      {book.oldPrice && <span className="old-price">{book.oldPrice}</span>}
    </div>
  </Card>
);

const BestSellers = ({ data }: BestSellersProps) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bestsellers-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-title">Sách Bán Chạy Nhất Tuần</h2>
        <Text type="secondary">Những cuốn sách được yêu thích nhất của chúng tôi</Text>
      </div>
      <Carousel
        slidesToShow={4}
        slidesToScroll={4}
        dots={false}
        arrows={true}
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
          { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]}
      >
        {data.map((book: any) => (
          <div key={book.id} className="carousel-item-padding">
            <BookCard book={book} onClick={() => handleNavigate(book.id)} />
          </div>
        ))}
      </Carousel>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button type="primary" size="large" onClick={() => navigate('/products')}>
          Xem Thêm Sách
        </Button>
      </div>
    </div>
  );
};

export default BestSellers;
