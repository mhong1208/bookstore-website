import type { ICategory } from "../types/category";
import axiosClient from "./axios-client";

export const categoryService = {
    // /** Lấy danh sách tất cả danh mục *
    getAll: (): Promise<any> => {
        return axiosClient.get('/api/categories');
    },

    // /** Lấy chi tiết một danh mục theo ID */
    getById: (id: string | number): Promise<any> => {
        return axiosClient.get(`/api/categories/${id}`);
    },
    
    // /** Tạo mới một danh mục */
    create: (data: { name: string, description?: string }): Promise<ICategory> => {
        return axiosClient.post('/api/categories', data);
    },

    // /** Cập nhật một danh mục theo ID */
    update: (id: string, data: { name: string, description?: string, isActive?: boolean }): Promise<ICategory> => {
        return axiosClient.put(`/api/categories/${id}`, data);
    },

    // /** Xóa một danh mục theo ID */
    remove: (id: string): Promise<any> => {
        return axiosClient.delete(`/api/categories/${id}`);
    }
};