
import { Card, Carousel, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import '../BestSellers/styles.css'; // Reusing styles from BestSellers
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

// Placeholder data
const newReleases = [
  { id: 1, title: 'Giết con chim nhại', author: 'Harper Lee', price: '135.000đ', image: 'https://images.unsplash.com/photo-1549122728-f51970943454?q=80&w=1935&auto=format&fit=crop' },
  { id: 2, title: 'Trăm năm cô đơn', author: 'Gabriel García Márquez', price: '165.000đ', image: 'https://images.unsplash.com/photo-1519682337058-e9a01611b413?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, title: 'Bắt trẻ đồng xanh', author: 'J.D. Salinger', price: '95.000đ', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, title: 'Rừng Na Uy', author: 'Haruki Murakami', price: '140.000đ', image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1887&auto=format&fit=crop' },
  { id: 5, title: 'Đi tìm lẽ sống', author: 'Viktor E. Frankl', price: '85.000đ', image: 'https://images.unsplash.com/photo-1524578271613-d550e77855e3?q=80&w=1887&auto=format&fit=crop' },
  { id: 6, title: 'Người đua diều', author: 'Khaled Hosseini', price: '125.000đ', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop' },
];

const BookCard = ({ book, onClick }: any) => (
  <Card
    hoverable
    className="book-card"
    cover={<img alt={book.title} src={book.image} className="book-cover-img" />}
    actions={[
      <Button type="primary" icon={<ShoppingCartOutlined />} className="add-to-cart-btn">
        Thêm vào giỏ
      </Button>
    ]}
    onClick={onClick}
  >
    <Meta title={book.title} description={book.author} />
    <div className="book-price">
      <span className="current-price">{book.price}</span>
    </div>
  </Card>
);

const NewReleases = () => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bestsellers-section"> {/* Reusing class for consistent styling */}
      <h2 className="section-title">Vừa Cập Bến</h2>
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
        {newReleases.map(book => (
          <div key={book.id} className="carousel-item-padding">
            <BookCard book={book} onClick={() => handleNavigate(book.id)} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewReleases;
