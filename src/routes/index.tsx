// AppRoutes.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/home';
import PrivateRouteModal from './PrivateRouteModal';
import ProductDetailPage from '../pages/ProductDetail';
import LoginPage from '../pages/login';
import CartPage from '../pages/cart';
import CheckoutPage from '../pages/checkout';
import AdminDashboard from '../pages/admin/dashboard';
import AdminLayout from '../layouts/AdminLayout';
import RegisterPage from '../pages/register';
import ShopPage from '../pages/shop';
import CategoryManagementPage from '../pages/admin/category';
import ProductManagementPage from '../pages/admin/product';
import VoucherManagementPage from '../pages/admin/voucher';
import UserManagementPage from '../pages/admin/user';
import OrderManagementPage from '../pages/admin/order';
import ProfilePage from '../pages/profile';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Layout chung cho khách hàng
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'products', element: <ShopPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <PrivateRouteModal />,
        children: [
          { path: 'cart', element: <CartPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  
   {
    path: '/admin',
    element: <AdminLayout />, // Layout chỉ render 1 lần
    children: [
      // { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'categories', element: <CategoryManagementPage /> },
      { path: 'products', element: <ProductManagementPage /> },
      { path: 'vouchers', element: <VoucherManagementPage /> },
      { path: 'users', element: <UserManagementPage /> },
      { path: 'orders', element: <OrderManagementPage /> },
    ],
  },
]);

const AppRoutes: React.FC = () => <RouterProvider router={router} />;

export default AppRoutes;