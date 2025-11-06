import "./styles.css";
import { useState } from "react";
import { Row, Col, Input, Pagination, Spin, Card } from "antd";
import useProducts from "./hooks/useListProduct";
import BookCard from "../../components/ProductCard";
import useListCategory from "./hooks/useListCategory";

const { Search } = Input;

const ShopPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const { products, total, loading } = useProducts({
    pageIndex,
    pageSize,
    categoryId,
    name,
  });
  const { categories } = useListCategory();

  return (
    <div className="shop-container">
      {/* Sidebar */}
      <Card style={{ textAlign: 'left'}} className="sidebar" title="Danh mục" bordered={false}>
        <ul className="category-list">
          {categories.map((category) => (
            <li
              key={category.id}
              className={categoryId === category.id ? "active" : ""}
              onClick={() => {
                setCategoryId(category.id === categoryId ? null : String(category.id));
                setPageIndex(1);
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </Card>

      {/* Content */}
      <div className="content">
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

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {products.map((product: any) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <BookCard book={product} />
              </Col>
            ))}
          </Row>
        )}

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
  );
};

export default ShopPage;
