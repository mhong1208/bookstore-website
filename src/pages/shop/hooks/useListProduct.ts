import { useState, useEffect } from "react";
import { message } from "antd";
import { productService } from "../../../api/product.service";

interface ProductParams {
  pageSize: number;
  pageIndex: number;
  categoryId?: string | null;
  name?: string | null;
  isActive?: boolean;
  [key: string]: any;
}

const useProducts = (params: ProductParams) => {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getAll({
        ...params,
        pageSize: params.pageSize,
        pageIndex: params.pageIndex,
        categoryId: params.categoryId || undefined,
        name: params.name || undefined,
        isActive: params.isActive,
      });

      // Chuẩn hóa data trả về
      const items = response.data?.items || response.data || [];
      const totalItems = response.data?.total ?? items?.length ?? 0;

      setProducts(items);
      setTotal(totalItems);

    } catch (err: any) {
      setError(err);
      message.error("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    params.pageSize,
    params.pageIndex,
    params.categoryId,
    params.name,
    params.isActive,
  ]);

  return { products, total, loading, error, refetch: fetchProducts };
};

export default useProducts;
