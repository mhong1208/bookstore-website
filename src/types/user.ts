// Định nghĩa cấu trúc cho đối tượng User
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string; // Thuộc tính không bắt buộc
}

// Định nghĩa kiểu cho một vai trò của user
export type UserRole = 'admin' | 'editor' | 'viewer';