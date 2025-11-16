import { Carousel, Typography, Skeleton } from 'antd';
import './style.css';
import type { IProduct } from '../../../../types/product';
import ProductCard from '../../../../components/ProductCard';

const { Text } = Typography;

const NewReleases = ({ data, loading }: { data: IProduct[], loading: boolean }) => {
  return (
    <div className="bestsellers-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-title">Sách Mới Cập Bến</h2>
        <Text type="secondary">Những cuốn sách mới nhất của chúng tôi</Text>
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Skeleton.Node active style={{ width: '250px', height: '400px' }}><div /></Skeleton.Node>
          <Skeleton.Node active style={{ width: '250px', height: '400px' }}><div /></Skeleton.Node>
          <Skeleton.Node active style={{ width: '250px', height: '400px' }}><div /></Skeleton.Node>
          <Skeleton.Node active style={{ width: '250px', height: '400px' }}><div /></Skeleton.Node>
        </div>
      ) : (
        <Carousel
          slidesToShow={4}
          slidesToScroll={4}
          dots={false}
          arrows={true}
          responsive={[
            { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
          ]}
        >
          {data?.map(book => (
            <div key={book._id} className="carousel-item-padding">
              <ProductCard book={book} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default NewReleases;