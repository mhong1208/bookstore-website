import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { productService } from "../../../api/product.service";

const useProducts = (pageIndex: number, pageSize: number) => {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productService.getAll({
          pageSize,
          pageIndex,
        });

        const items = response?.data?.items || response?.data || response || [];
        const totalItems = response?.data?.total ?? items?.length ?? 0;

        setProducts(items);
        setTotal(totalItems);
      } catch (err) {
        setError(err);
        message.error("Lỗi khi tải danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [pageIndex, pageSize]);

  const refetch = useCallback(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productService.getAll({
          pageSize,
          pageIndex,
        });

        const items = response?.data?.items || response?.data || response || [];
        const totalItems = response?.data?.total ?? items?.length ?? 0;

        setProducts(items);
        setTotal(totalItems);
      } catch (err) {
        setError(err);
        message.error("Lỗi khi tải danh sách sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [pageIndex, pageSize]);

  return { products, total, loading, error, refetch };
};

export default useProducts;
