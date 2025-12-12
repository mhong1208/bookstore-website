import { Row, Col, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../../../components/ProductCard';

const { Text } = Typography;

interface BestSellersProps {
  data: any[];
  loading?: boolean;
}

const BestSellers = ({ data, loading }: BestSellersProps) => {
  const navigate = useNavigate();

  return (
    <div className="bestsellers-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-title">Sách Bán Chạy Nhất Tuần</h2>
        <Text type="secondary">Những cuốn sách được yêu thích nhất của chúng tôi</Text>
      </div>

      <Row gutter={[16, 16]}>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <div style={{ padding: 24, border: '1px solid #f0f0f0', borderRadius: 8 }}>
                <Typography.Title level={5} style={{ display: 'none' }}>Skeleton</Typography.Title>
                <div style={{ width: '100%', height: 200, background: '#f5f5f5', marginBottom: 16 }} />
                <div style={{ height: 20, width: '80%', background: '#f5f5f5', marginBottom: 8 }} />
                <div style={{ height: 20, width: '40%', background: '#f5f5f5' }} />
              </div>
            </Col>
          ))
          : data.map((book) => (
            <Col
              key={book.id || book._id} // Support both id and _id
              xs={24} sm={12} md={8} lg={6}
            >
              <BookCard book={book} />
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
