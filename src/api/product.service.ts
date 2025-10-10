import axiosClient from "./axios-client";

interface Product {
  id: number;
  name: string;
  price: number;
}

// Tạo một service cho sản phẩm
export const productService = {
  /** Lấy danh sách sản phẩm */
  getAll: (params?: object): Promise<Product[]> => {
    return axiosClient.get('/products', { params });
  },

  /** Lấy chi tiết một sản phẩm theo ID */
  getById: (id: number): Promise<Product> => {
    return axiosClient.get(`/products/${id}`);
  },

  /** Tạo sản phẩm mới (ví dụ cho trang admin) */
  create: (data: Omit<Product, 'id'>): Promise<Product> => {
    return axiosClient.post('/products', data);
  }
};