
import { Card, Rate, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles.css';
const { Text } = Typography;
const reviews = [
  { name: 'Nguyễn Văn A', rating: 5, review: 'Sách chất lượng, giao hàng nhanh. Rất hài lòng với dịch vụ của bookstore!', avatar: '' },
  { name: 'Trần Thị B', rating: 4.5, review: 'Nhiều đầu sách hay và đa dạng. Website dễ sử dụng, sẽ tiếp tục ủng hộ.', avatar: '' },
  { name: 'Lê Văn C', rating: 5, review: 'Tìm được những cuốn sách hiếm ở đây. Cảm ơn shop rất nhiều!', avatar: '' },
];

const CustomerReviews = () => {
  return (
    <div className="customer-reviews-section">
      <h2 className="section-title"></h2>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ color: '#fff'}}>Đánh Giá Từ Khách Hàng</h2>
        <Text type="secondary" style={{ color: '#fff'}}>Nghe những chia sẻ từ những khách hàng thân thiết của chúng tôi</Text>
      </div>
      <div className="reviews-grid">
        {reviews.map((item, index) => (
          <Card key={index} className="review-card">
            <div className="review-header">
              <Avatar size={48} icon={<UserOutlined />} src={item.avatar} />
              <div className="reviewer-info">
                <p className="reviewer-name">{item.name}</p>
                <Rate disabled allowHalf defaultValue={item.rating} />
              </div>
            </div>
            <p className="review-text">"{item.review}"</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
