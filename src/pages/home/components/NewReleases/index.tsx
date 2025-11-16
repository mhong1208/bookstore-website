import { Typography, Skeleton, Row, Col } from 'antd';
import './style.css';
import type { IProduct } from '../../../../types/product';
import ProductCard from '../../../../components/ProductCard';

const { Text } = Typography;

const NewReleases = ({ data, loading }: { data: IProduct[], loading: boolean }) => {
  const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
    <Col key={index} xs={24} sm={12} md={8} lg={6}>
      <Skeleton active paragraph={{ rows: 4 }} style={{ width: '100%', height: 400 }} />
    </Col>
  ));

  return (
    <div className="bestsellers-section" style={{ marginBottom: 16}}>
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '40px'}}>
        <h2 className="section-title">Sách Mới Cập Bến</h2>
        <Text type="secondary">Những cuốn sách mới nhất của chúng tôi</Text>
      </div>

      {loading ? (
        <Row gutter={[16, 16]}>
          {skeletonItems}
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {data?.map((book) => (
            <Col key={book._id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard book={book} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default NewReleases;
