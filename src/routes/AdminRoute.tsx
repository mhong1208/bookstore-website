import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Đảm bảo đường dẫn đúng

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (user && user.role === 'ADMIN') {
    return <>{children}</>; 
  }

  if (user && user.role === 'CUSTOMER') {
     return <Navigate to="/" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default AdminRoute;