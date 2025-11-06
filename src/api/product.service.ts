import axiosClient from "./axios-client";


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

  // /** Tạo sản phẩm mới (ví dụ cho trang admin) */
  // create: (data: Omit<Product, 'id'>): Promise<Product> => {
  //   return axiosClient.post('/products', data);
  // }
};