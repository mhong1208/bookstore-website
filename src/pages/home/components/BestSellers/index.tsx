
import { Card, Carousel, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './styles.css';

const { Meta } = Card;

// Placeholder data
const bestSellers = [
  { id: 1, title: 'Lược sử loài người', author: 'Yuval Noah Harari', price: '150.000đ', oldPrice: '200.000đ', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, title: 'Nhà giả kim', author: 'Paulo Coelho', price: '80.000đ', image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1887&auto=format&fit=crop' },
  { id: 3, title: 'Đắc nhân tâm', author: 'Dale Carnegie', price: '99.000đ', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop' },
  { id: 4, title: 'Tội ác và hình phạt', author: 'Fyodor Dostoevsky', price: '180.000đ', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1888&auto=format&fit=crop' },
  { id: 5, title: 'Cha giàu, cha nghèo', author: 'Robert T. Kiyosaki', price: '120.000đ', image: 'https://images.unsplash.com/photo-1583389917389-5691216b8e93?q=80&w=1887&auto=format&fit=crop' },
  { id: 6, title: 'Deep Work', author: 'Cal Newport', price: '110.000đ', image: 'https://images.unsplash.com/photo-1598300188926-0a2a8b5d1575?q=80&w=1887&auto=format&fit=crop' },
];

const BookCard = ({ book }: any) => (
  <Card
    hoverable
    className="book-card"
    cover={<img alt={book.title} src={book.image} className="book-cover-img" />}
    actions={[
      <Button type="primary" icon={<ShoppingCartOutlined />} className="add-to-cart-btn">
        Thêm vào giỏ
      </Button>
    ]}
  >
    <Meta title={book.title} description={book.author} />
    <div className="book-price">
      <span className="current-price">{book.price}</span>
      {book.oldPrice && <span className="old-price">{book.oldPrice}</span>}
    </div>
  </Card>
);

const BestSellers = () => {
  return (
    <div className="bestsellers-section">
      <h2 className="section-title">Sách Bán Chạy Nhất Tuần</h2>
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
        {bestSellers.map(book => (
          <div key={book.id} className="carousel-item-padding">
            <BookCard book={book} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BestSellers;
