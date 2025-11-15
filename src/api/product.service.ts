import type { IProduct } from '../types/product';
import axiosClient from './axios-client';

// Tạo một service cho sản phẩm
export const productService = {
  /** Lấy danh sách sản phẩm */
  getAll: (params?: object): Promise<any> => {
    return axiosClient.get('/api/products', { params });
  },

  /** Lấy chi tiết một sản phẩm theo ID */
  getById: (id: string | number): Promise<any> => {
    return axiosClient.get(`/api/products/${id}`);
  },

  /** Tạo sản phẩm mới */
  create: (data: Partial<IProduct>): Promise<IProduct> => {
    return axiosClient.post('/api/products', data);
  },

  /** Cập nhật một sản phẩm theo ID */
  update: (id: string, data: Partial<IProduct>): Promise<IProduct> => {
    return axiosClient.put(`/api/products/${id}`, data);
  },

  /** Xóa một sản phẩm theo ID */
  remove: (id: string): Promise<any> => {
    return axiosClient.delete(`/api/products/${id}`);
  },
};