import { useState, useEffect } from "react";
import { message } from "antd";
import { productService } from "../../../api/product.service";

const useProducts = (pageIndex: number, pageSize: number) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0); // tổng số sản phẩm
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (pageIndex: number, pageSize: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getAll({
        pageSize,
        pageIndex,
      });

      setProducts(response.data); 
      setTotal(response.data.total || response.data.length);
    } catch (error) {
      message.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  return { products, total, loading, error, refetch: fetchProducts };
};

export default useProducts;
