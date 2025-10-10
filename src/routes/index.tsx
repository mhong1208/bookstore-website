import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Sử dụng layout chung
    children: [
      {
        index: true, // Trang mặc định khi truy cập '/'
        element: <HomePage />,
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