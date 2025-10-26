
import { Card, Col, Row } from 'antd';
import { BookOutlined, LineChartOutlined, HeartOutlined, SmileOutlined, RocketOutlined, DesktopOutlined } from '@ant-design/icons';
import './styles.css';

const categories = [
  { name: 'Văn học', icon: <BookOutlined /> },
  { name: 'Kinh tế', icon: <LineChartOutlined /> },
  { name: 'Kỹ năng sống', icon: <HeartOutlined /> },
  { name: 'Sách thiếu nhi', icon: <SmileOutlined /> },
  { name: 'Khoa học & Viễn tưởng', icon: <RocketOutlined /> },
  { name: 'Công nghệ', icon: <DesktopOutlined /> },
];

const FeaturedCategories = () => {
  return (
    <div className="featured-categories-section">
      <h2 className="section-title">Danh mục sách</h2>
      <Row gutter={[24, 24]}>
        {categories.map(category => (
          <Col xs={12} sm={8} md={6} lg={4} key={category.name}>
            <Card hoverable className="category-card">
              <div className="category-icon">{category.icon}</div>
              <p className="category-name">{category.name}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedCategories;
