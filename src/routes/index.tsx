import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/home';
import ProductDetailPage from '../pages/ProductDetail';
import CartPage from '../pages/cart';
import CheckoutPage from '../pages/checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Sử dụng layout chung
    children: [
      {
        index: true, // Trang mặc định khi truy cập '/'
        element: <HomePage />,
      },
      {
        path: 'product/:productId', 
        element: <ProductDetailPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },


      // {
      //   path: 'about',
      //   element: <AboutPage />,
      // },
    ],
  },
]);

const AppRoutes: React.FC = () => <RouterProvider router={router} />;

export default AppRoutes;