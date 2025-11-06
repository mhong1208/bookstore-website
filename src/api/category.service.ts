import axiosClient from "./axios-client";

export const categoryService = {
    // /** Lấy danh sách tất cả danh mục *
    getAll: (): Promise<any> => {
        return axiosClient.get('/api/categories');
    },

    // /** Lấy chi tiết một danh mục theo ID */
    getById: (id: string | number): Promise<any> => {
        return axiosClient.get(`/api/categories/${id}`);
    }
};