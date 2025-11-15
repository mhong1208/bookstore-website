import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography, Dropdown, Avatar, Space } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
  getItem('Quản lý Danh mục', '/admin/categories', <AppstoreOutlined />),
  getItem('Quản lý Sản phẩm', '/admin/products', <DesktopOutlined />),
  getItem('Quản lý Người dùng', '/admin/users', <UserOutlined />),
  getItem('Quản lý Đơn hàng', '/admin/orders', <FileOutlined />),
  getItem('Quản lý Voucher', '/admin/vouchers', <AppstoreOutlined />),
];

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { Title } = Typography;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Hàm xử lý khi nhấn vào menu
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // e.key chính là path chúng ta đã định nghĩa
    navigate(e.key);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenu: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

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
        <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Dropdown menu={{ items: userMenu }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                {user?.name} {user?.email}
              </Space>
            </a>
          </Dropdown>
        </Header>
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