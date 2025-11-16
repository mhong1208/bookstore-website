import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { authService } from '../api/auth.service';

interface User {
  id: string;
  role: 'admin' | 'customer';
  email: string;
  name: string;
  
}


const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedUser = jwtDecode<User>(token); 
        setUser(decodedUser);
      }
    } catch (error) {
      console.error("Token không hợp lệ:", error);
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  }, []); 

    const login = async (data: { email: string; password: string }) => {
        try {
            const response = await authService.login(data);
            const token = response.data.token; 

            if (!token) {
            throw new Error("Không tìm thấy token trong phản hồi API");
            }

            const decodedUser = jwtDecode<User>(token);

            localStorage.setItem('authToken', token);
            setUser(decodedUser);
            return response.data;
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            throw error;
        }
    };


  const register = async (data: any) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Nếu component không được bọc trong AuthProvider, context sẽ là undefined
  if (context === undefined) {
    throw new Error('useAuth phải được dùng bên trong một AuthProvider');
  }

  return context;
};