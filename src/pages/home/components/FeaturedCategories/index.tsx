
import { Card, Col, Row, Skeleton } from 'antd';
import { BookOutlined, LineChartOutlined, HeartOutlined, SmileOutlined, RocketOutlined, DesktopOutlined } from '@ant-design/icons';
import './styles.css';
import useListCategory from './hooks/useListCategory';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  'Văn học': <BookOutlined />,
  'Kinh tế': <LineChartOutlined />,
  'Kỹ năng sống': <HeartOutlined />,
  'Sách thiếu nhi': <SmileOutlined />,
  'Khoa học & Viễn tưởng': <RocketOutlined />,
  'Công nghệ': <DesktopOutlined />,
};

const FeaturedCategories = () => {
  const { categories, loading } = useListCategory();

  return (
    <div className="featured-categories-section">
      <h2 className="section-title">Danh mục sách</h2>
      <Row gutter={[24, 24]}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Col xs={12} sm={8} md={6} lg={4} key={index}>
              <Card className="category-card">
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))
        ) : (
          categories.map(category => (
            <Col xs={12} sm={8} md={6} lg={4} key={category._id}>
               <Link to={`/products?category=${category._id}`}>
                <Card hoverable className="category-card">
                  <div className="category-icon">{iconMap[category.name] || <BookOutlined />}</div>
                  <p className="category-name">{category.name}</p>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default FeaturedCategories;
