import { Carousel, Button, Tag, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './style.css';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;
const newReleasesData = [
  { 
    id: 1, 
    title: 'Tương Lai Của Trí Tuệ Nhân Tạo', 
    author: 'Kai-Fu Lee', 
    releaseDate: 'Tháng 11, 2024',
    description: 'Khám phá cách AI sẽ thay đổi thế giới và cuộc sống của chúng ta',
    tag: 'Công Nghệ',
    image: 'https://images.unsplash.com/photo-1518349619864-85b9ff3f3de3?q=80&w=1887&auto=format&fit=crop' // Placeholder image
  },
  { 
    id: 2, 
    title: 'Hành Trình Khám Phá Bản Thân', 
    author: 'Brené Brown', 
    releaseDate: 'Tháng 10, 2024',
    description: 'Tìm hiểu về sự dễ bị tổn thương và sức mạnh của nó',
    tag: 'Tâm Lý',
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=2070&auto=format&fit=crop' // Placeholder image
  },
  { 
    id: 3, 
    title: 'Sức Mạnh Của Thói Quen', 
    author: 'Charles Duhigg', 
    releaseDate: 'Tháng 9, 2024',
    description: 'Tại sao chúng ta làm những gì chúng ta làm trong cuộc sống và kinh doanh',
    tag: 'Self-help',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop' // Placeholder image
  },
];


const NewReleaseCard = ({ book, onClick }: any) => (
  <div className="new-release-card" onClick={onClick}>
    <div className="new-release-card-image-wrapper">
      <img alt={book.title} src={book.image} className="new-release-card-image" />
    </div>

    <div className="new-release-card-content">
      <Tag color="blue" className='new-release-card-tag'>{book.tag}</Tag>
      <h3 className="new-release-card-title">{book.title}</h3>
      <p className="new-release-card-author">Tác giả: {book.author}</p>
      <p className="new-release-card-description">{book.description}</p>
      <Button 
        icon={<ArrowRightOutlined />}
        type="primary"
        className="new-release-card-details-btn"
      >
        Xem Chi Tiết
      </Button>
    </div>
  </div>
);

const NewReleases = () => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bestsellers-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-title">Sách Mới Cập Bến</h2>
        <Text type="secondary">Những cuốn sách được yêu thích nhất của chúng tôi</Text>
      </div>
      <Carousel
        slidesToShow={2}
        slidesToScroll={2}
        dots={false}
        arrows={true}
        responsive={[
          { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]}
      >
        {newReleasesData.map(book => (
          <div key={book.id} className="carousel-item-padding">
            <NewReleaseCard book={book} onClick={() => handleNavigate(book.id)} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewReleases;