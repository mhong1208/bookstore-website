import { Row, Col, Card, Typography, Button, Tag, Space } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  ArrowRightOutlined,
  ReadOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.css'; 

const { Title, Paragraph, Text } = Typography;

const blogData = [
  {
    id: 1,
    category: 'Kinh Doanh',
    readTime: '5 phút',
    title: '5 Cuốn Sách Phải Đọc Để Phát Triển Kỹ Năng Lãnh Đạo',
    excerpt: 'Khám phá những cuốn sách kinh điển giúp bạn trở thành một nhà lãnh đạo tuyệt vời...',
    author: 'Nguyễn Văn Minh',
    date: '15 Tháng 11, 2024',
    image: 'https://images.pexels.com/photos/205316/pexels-photo-205316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    category: 'Tâm Lý',
    readTime: '7 phút',
    title: 'Cách Chọn Sách Phù Hợp Cho Mục Tiêu Phát Triển Bản Thân',
    excerpt: 'Hướng dẫn chi tiết cách lựa chọn sách sao cho phù hợp với mục tiêu và nhu cầu của bạn...',
    author: 'Trần Thị Hương',
    date: '12 Tháng 11, 2024',
    image: 'https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    category: 'Xu Hướng',
    readTime: '6 phút',
    title: 'Xu Hướng Đọc Sách Năm 2024: Những Thể Loại Nổi Bật',
    excerpt: 'Tìm hiểu những xu hướng đọc sách mới nhất và những thể loại sách được yêu thích nhất...',
    author: 'Lê Hoàng Anh',
    date: '10 Tháng 11, 2024',
    image: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];

const BlogPostCard = ({ post }: { post: any }) => (
  <Card
    hoverable
    className="blog-post-card"
    cover={
      <img 
        alt={post.title} 
        src={post.image} 
        className="blog-post-image"
      />
    }
  >
    <div className="blog-post-meta-top">
      <Tag color='blue'>{post.category}</Tag>
    </div>
    
    <Title level={4} className="blog-post-title">
      <Link to={`/blog/${post.id}`}>{post.title}</Link>
    </Title>
    
    <Paragraph type="secondary" className="blog-post-excerpt">
      {post.excerpt}
    </Paragraph>
    
    <div className="blog-post-meta-bottom">
      <Space size="middle">
        <Text type="secondary">
          <UserOutlined style={{ marginRight: 6 }} />
          {post.author}
        </Text>
        <Text type="secondary">
          <CalendarOutlined style={{ marginRight: 6 }} />
          {post.date}
        </Text>
      </Space>
    </div>
    
    <Link to={`/blog/${post.id}`} className="blog-post-read-more">
      Đọc Tiếp <ArrowRightOutlined />
    </Link>
  </Card>
);

// Component BlogSection chính
const BlogSection = () => {
  return (
    <div className="blog-section">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" >Bài viết mới</h2>
            <Text type="secondary">
            Những bài viết hữu ích về sách, đọc sách và phát triển bản thân
            </Text>
        </div>
      
        <Row gutter={[24, 24]}>
            {blogData.map(post => (
            <Col key={post.id} xs={24} sm={24} md={12} lg={8}>
                <BlogPostCard post={post} />
            </Col>
            ))}
        </Row>
        
        <div className="blog-section-footer">
            <Button 
            type="primary" 
            size="large" 
            className="view-all-btn"
            icon={<ReadOutlined />}
            >
            <Link to="/blog">Xem Tất Cả Bài Viết</Link>
            </Button>
        </div>
    </div>
  );
};

export default BlogSection;