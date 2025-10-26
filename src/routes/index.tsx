import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/home';
import ProductDetailPage from '../pages/ProductDetail';
import CartPage from '../pages/cart';
import CheckoutPage from '../pages/checkout';
import LoginPage from '../pages/login';
import PrivateRouteModal from './PrivateRouteModal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:productId', element: <ProductDetailPage /> },
      {
        element: <PrivateRouteModal  />,
        children: [
          { path: 'cart', element: <CartPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
        ],
      },

      { path: 'login', element: <LoginPage /> },
    ],
  },
]);

const AppRoutes: React.FC = () => <RouterProvider router={router} />;

export default AppRoutes;
