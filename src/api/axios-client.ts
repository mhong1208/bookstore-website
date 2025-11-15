import { notification } from 'antd';
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3300';

const axiosClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Xử lý response
axiosClient.interceptors.response.use(
  (response) => {
    // Nếu request thành công, trả về thẳng data
    return response.data;
  },
  (error) => {
    // Xử lý lỗi 401 (Unauthorized - Token hết hạn hoặc không hợp lệ)
      if (error.response?.status === 401) {
      // Xóa token và thông tin user khỏi localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
 
      // Hiển thị thông báo cho người dùng
      notification.error({
        message: 'Phiên đăng nhập đã hết hạn',
        description: 'Vui lòng đăng nhập lại để tiếp tục.',
      });

      // Chuyển hướng người dùng về trang đăng nhập
      // Dùng window.location.href để reload lại trang, đảm bảo state được reset
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
     }

    // Trả về lỗi để component có thể bắt và xử lý (ví dụ: hiển thị thông báo lỗi)
    return Promise.reject(error);
  }
);

export default axiosClient;