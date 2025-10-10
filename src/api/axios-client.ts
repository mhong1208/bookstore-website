import axios from 'axios';

// Lấy URL API từ file biến môi trường .env
const VITE_API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Tự động thêm token vào header của mỗi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
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
      // Xóa token hoặc thông tin user khỏi localStorage
      localStorage.removeItem('accessToken');
      
      // Chuyển hướng người dùng về trang đăng nhập
      // Dùng window.location.href để reload lại trang, đảm bảo state được reset
      window.location.href = '/login';
      
      // Có thể hiển thị thông báo cho người dùng ở đây
      alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
    }

    // Trả về lỗi để component có thể bắt và xử lý (ví dụ: hiển thị thông báo lỗi)
    return Promise.reject(error);
  }
);

export default axiosClient;