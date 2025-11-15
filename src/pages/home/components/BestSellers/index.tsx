import { Row, Col, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../../../components/ProductCard';

const { Text } = Typography;

interface BestSellersProps {
  data: any[];
}

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

      <Row gutter={[16, 16]}>
        {data.map((book) => (
          <Col 
            key={book.id} 
            xs={24} sm={12} md={8} lg={6} // responsive
          >
            <BookCard book={book} onClick={() => handleNavigate(book.id)} />
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button type="primary" size="large" onClick={() => navigate('/products')}>
          Xem Thêm Sách
        </Button>
      </div>
    </div>
  );
};

export default BestSellers;
