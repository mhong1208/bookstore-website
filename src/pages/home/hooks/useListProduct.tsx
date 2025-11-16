import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { productService } from '../../../api/product.service';

const useProducts = (params: object) => {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll(params);

      const items = response?.data?.items || response?.data || response || [];
      const totalItems = response?.data?.total ?? items?.length ?? 0;

      setProducts(items);
      setTotal(totalItems);
    } catch (err) {
      setError(err);
      message.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  return { products, total, loading, error, refetch: fetchProductsData };
};

export default useProducts;
