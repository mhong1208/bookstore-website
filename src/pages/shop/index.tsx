import "./styles.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Row, Col, Input, Pagination, Card, Skeleton, Empty } from "antd"; // Đã thêm Empty
import useProducts from "./hooks/useListProduct";
import BookCard from "../../components/ProductCard";
import useListCategory from "./hooks/useListCategory";
import { Content } from "antd/es/layout/layout";

const { Search } = Input;

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get("category");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10); 
  const [categoryId, setCategoryId] = useState<string | null>(categoryIdFromUrl);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setCategoryId(categoryIdFromUrl);
    setPageIndex(1);
  }, [categoryIdFromUrl]);

  const { products, total, loading } = useProducts({
    pageIndex,
    pageSize,
    categoryId,
    name,
  });
  const { categories } = useListCategory();

  // Tạo mảng skeleton để render khi loading
  const skeletonItems = Array.from({ length: pageSize }).map((_, index) => (
    <Col xs={24} sm={12} md={8} lg={6} key={index}>
      <Card>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>
    </Col>
  ));

  return (
    <div className="shop-container">
      {/* Sidebar */}
      <Card 
        style={{ textAlign: "left" }} 
        className="sidebar" 
        title="Danh mục" 
        bordered={false}
      >
        <ul className="category-list">
          <li
            className={!categoryId ? "active" : ""}
            onClick={() => {
              setCategoryId(null);
              setPageIndex(1);
            }}
          >
            Tất cả
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              className={categoryId === category._id ? "active" : ""}
              onClick={() => {
                setCategoryId(category._id === categoryId ? null : String(category._id));
                setPageIndex(1);
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </Card>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%'}}>

        <div className="search-bar">
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            onSearch={(value) => {
              setName(value || null);
              setPageIndex(1);
            }}
            enterButton
            size="large"
          />
        </div>

        {/* Products Grid */}
        {loading ? (
          <Row gutter={[16, 16]}>
            {skeletonItems}
          </Row>
        ) : (
          products.length === 0 ? (
            <Empty description="Không tìm thấy sản phẩm nào" />
          ) : (
            // --- THÊM 'justify="start"' VÀO ĐÂY ---
            <Row gutter={[16, 16]} justify="start"> 
              {products.map((product) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  key={product._id}
                  style={{ marginBottom: 16 }}
                >
                  <BookCard book={product} />
                </Col>
              ))}
            </Row>
          )
        )}

        {/* Pagination */}
        <div className="pagination">
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={total}
            onChange={(p) => setPageIndex(p)}
            showSizeChanger={false}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;