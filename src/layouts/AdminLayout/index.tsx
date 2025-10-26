import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

// Định nghĩa kiểu cho các mục menu
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// Các mục menu cho trang Admin
const adminMenuItems: MenuItem[] = [
  getItem('Dashboard', '/admin/dashboard', <PieChartOutlined />),
  getItem('Quản lý Sản phẩm', '/admin/products', <DesktopOutlined />),
  getItem('Quản lý Người dùng', '/admin/users', <UserOutlined />),
  getItem('Quản lý Đơn hàng', '/admin/orders', <FileOutlined />),
];

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { Title } =   Typography;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Hàm xử lý khi nhấn vào menu
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // e.key chính là path chúng ta đã định nghĩa
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 1. Sidebar (Menu bên trái) */}
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <Title level={3} style={{ color: 'white', textAlign: 'center', margin: '16px 0' }}>
          Bookstore

        </Title>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['/admin/dashboard']} 
          mode="inline" 
          items={adminMenuItems} 
          onClick={handleMenuClick} // Thêm sự kiện click
        />
      </Sider>

      {/* 2. Phần nội dung chính (Bên phải) */}
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Đây là nơi các trang con (Dashboard, Users...) sẽ được render */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Admin Bookstore ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;