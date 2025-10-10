
import React from 'react';
import { Row, Col, Image, Typography, Rate, Button, InputNumber, Tabs, Card } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './styles.css';

const { Title, Text, Paragraph, Link } = Typography;
const { TabPane } = Tabs;

// Mock data for the product
const product = {
  id: 1,
  name: 'Lược sử loài người',
  author: 'Yuval Noah Harari',
  rating: 4.5,
  reviews: 123,
  price: '150.000đ',
  shortDescription: 'Một cuốn sách khám phá lịch sử loài người từ thời kỳ đồ đá đến tương lai của kỷ nguyên Silicon.',
  mainImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop',
  thumbnailImages: [
    'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1888&auto=format&fit=crop'
  ],
  detailedDescription: 'Sapiens: Lược sử loài người là cuốn sách của tác giả Yuval Noah Harari, được xuất bản lần đầu bằng tiếng Do Thái tại Israel năm 2011, và bằng tiếng Anh năm 2014. Sách trình bày khái quát lịch sử loài người từ thời kỳ đồ đá cho tới thế kỷ 21.',
  productInfo: {
    publisher: 'NXB Tri Thức',
    publishDate: '2014',
    pages: 512,
    dimensions: '16 x 24 cm'
  },
  customerReviews: [
    { name: 'Nguyễn Văn A', rating: 5, comment: 'Cuốn sách tuyệt vời, mở mang tầm mắt!' },
    { name: 'Trần Thị B', rating: 4, comment: 'Nội dung hay nhưng bản dịch có vài chỗ chưa mượt.' }
  ]
};

const ProductDetailPage: React.FC = () => {
  return (
    <div className="product-detail-page">
      <Row gutter={[48, 24]}>
        {/* Left Column: Images */}
        <Col xs={24} md={10}>
          <Image
            width="100%"
            src={product.mainImage}
            className="main-product-image"
          />
          <Image.PreviewGroup>
            <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
              {product.thumbnailImages.map((img, index) => (
                <Col span={8} key={index}>
                  <Image src={img} className="thumbnail-image" />
                </Col>
              ))}
            </Row>
          </Image.PreviewGroup>
        </Col>

        {/* Right Column: Details */}
        <Col xs={24} md={14}>
          <Title level={2} className="product-name">{product.name}</Title>
          <Text>Tác giả: <Link href="#">{product.author}</Link></Text>
          <div className="rating-section">
            <Rate allowHalf disabled defaultValue={product.rating} />
            <Text className="review-count">({product.reviews} đánh giá)</Text>
          </div>
          <Title level={3} className="product-price">{product.price}</Title>
          <Paragraph className="product-short-desc">{product.shortDescription}</Paragraph>
          
          <div className="action-buttons">
            <InputNumber min={1} max={10} defaultValue={1} size="large" />
            <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>
              Thêm vào giỏ hàng
            </Button>
            <Button size="large" icon={<HeartOutlined />}>
              Thêm vào yêu thích
            </Button>
          </div>
        </Col>
      </Row>

      {/* Bottom Section: Tabs */}
      <div className="detailed-info-section">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Mô tả chi tiết" key="1">
            <Paragraph>{product.detailedDescription}</Paragraph>
          </TabPane>
          <TabPane tab="Thông tin sản phẩm" key="2">
            <p><strong>Nhà xuất bản:</strong> {product.productInfo.publisher}</p>
            <p><strong>Ngày xuất bản:</strong> {product.productInfo.publishDate}</p>
            <p><strong>Số trang:</strong> {product.productInfo.pages}</p>
            <p><strong>Kích thước:</strong> {product.productInfo.dimensions}</p>
          </TabPane>
          <TabPane tab="Đánh giá từ khách hàng" key="3">
            {product.customerReviews.map((review, index) => (
              <Card key={index} style={{ marginTop: 16 }}>
                <p><strong>{review.name}</strong></p>
                <Rate disabled defaultValue={review.rating} />
                <p>{review.comment}</p>
              </Card>
            ))}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailPage;
