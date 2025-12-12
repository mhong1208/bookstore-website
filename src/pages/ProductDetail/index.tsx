
import React from 'react';
import { Row, Col, Typography, Rate, Button, InputNumber, Tabs, Tag } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import './styles.css';
import useDetailProduct from './hooks/useDetailProduct';
import { useParams } from 'react-router';
import BookCard from '../../components/ProductCard';
import { productService } from '../../api/product.service';
import type { IProduct } from '../../types/product';
import image from '../../assets/icon-no-image.svg';
import { formatPrice } from '../../common/helpers/formatPrice';

const { Title, Text, Paragraph, Link } = Typography;
const { TabPane } = Tabs;


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading } = useDetailProduct(id);
  const [quantity, setQuantity] = React.useState(1);
  const [relatedProducts, setRelatedProducts] = React.useState<IProduct[]>([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (product?.categories && product.categories.length > 0) {
      const firstCategory = product.categories[0];
      const categoryId = typeof firstCategory === 'string' ? firstCategory : (firstCategory.id || firstCategory._id);

      if (categoryId) {
        productService.getAll({ category: categoryId, _limit: 5, isActive: true })
          .then((res: any) => {
            const items = res?.data?.items || res?.data || res || [];
            // Filter out current product
            const related = items.filter((p: any) => (p.id || p._id) !== (product.id || product._id));
            setRelatedProducts(related.slice(0, 4));
          })
          .catch((err: any) => console.error('Failed to fetch related products:', err));
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart({
      id: product.id ?? product._id,
      title: product.title,
      price: Number(product.price) || 0,
      coverImage: product.coverImage || ''
    }));
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }
  return (
    <div className="product-detail-page">
      <Row gutter={[48, 24]}>
        <Col xs={24} md={10}>
          <img
            width="100%"
            alt={product?.title}
            height="400px"
            src={product?.coverImage || image}
            className="main-product-image"
          />
          {/* <Image.PreviewGroup>
            <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
              {product..map((img, index) => (
                <Col span={8} key={index}>
                  <Image src={img} className="thumbnail-image" />
                </Col>
              ))}
            </Row>
          </Image.PreviewGroup> */}
        </Col>

        {/* Right Column: Details */}
        <Col xs={24} md={14}>
          {product?.categories?.map((item: any) => (
            <Tag color='blue' key={item.id}>{item.name}</Tag>
          ))}
          <Title level={2} className="product-name">{product?.title}</Title>
          <Text style={{ color: '#888' }}>Tác giả: <Link href="#">{product?.author}</Link></Text>
          <div className="rating-section">
            <Rate allowHalf disabled defaultValue={product?.rating} />
            <Text className="review-count">({product?.reviews} đánh giá)</Text>
          </div>
          <Title level={3} className="product-price">{formatPrice(product?.price)}</Title>
          <Paragraph className="product-short-desc">{product?.description}</Paragraph>

          <div className="action-buttons">
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={(value) => setQuantity(value || 1)}
              size="large"
            />
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!product}
            >
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
            <Paragraph>{product?.description}</Paragraph>
          </TabPane>
          <TabPane tab="Thông tin sản phẩm" key="2">
            <p><strong>Nhà xuất bản:</strong> {product?.productInfo?.publisher}</p>
            <p><strong>Ngày xuất bản:</strong> {product?.productInfo?.publishDate}</p>
            <p><strong>Số trang:</strong> {product?.productInfo?.pages}</p>
            <p><strong>Kích thước:</strong> {product?.productInfo?.dimensions}</p>
          </TabPane>
          {/* <TabPane tab="Đánh giá từ khách hàng" key="3">
            {product.customerReviews.map((review, index) => (
              <Card key={index} style={{ marginTop: 16 }}>
                <p><strong>{review.name}</strong></p>
                <Rate disabled defaultValue={review.rating} />
                <p>{review.comment}</p>
              </Card>
            ))}
          </TabPane> */}
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section" style={{ marginTop: 40 }}>
          <Title level={3} style={{ marginBottom: 24 }}>Sản phẩm liên quan</Title>
          <Row gutter={[16, 16]}>
            {relatedProducts.map((item) => (
              <Col key={item.id || item._id} xs={12} sm={12} md={6} lg={6}>
                <BookCard book={item} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
