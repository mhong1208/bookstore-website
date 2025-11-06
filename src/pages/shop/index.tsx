import "./styles.css";
import { useState } from "react";
import { Row, Col, Input, Pagination, Spin } from "antd";
import useProducts from "./hooks/useListProduct";
import BookCard from "../../components/ProductCard";

const ShopPage = () => {
    const categories = ["Fiction", "Non-Fiction", "Science", "History", "Kids"];
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    const { products, total, loading } = useProducts({
    pageIndex,
    pageSize,
    categoryId,
    name,
    });


    return (
        <div className="shop-container">
            <div className="sidebar">
                <h3>Danh mục</h3>
                <ul>
                {categories.map((category) => (
                    <li key={category}>
                    <a href="#">{category}</a>
                    </li>
                ))}
                </ul>
            </div>

            <div className="content">
                <Input.Search
                placeholder="Tìm kiếm sản phẩm..."
                allowClear
                onSearch={(value) => setParams(prev => ({ ...prev, name: value }))}
                className="search-box"
                />

                {loading ? (
                <div className="loading-container">
                    <Spin size="large" />
                </div>
                ) : (
                <Row gutter={[16, 16]}>
                    {products.map((product: any) => (
                        <Col xs={24} sm={12} md={8} lg={8} key={product.id}>
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
