import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography, Dropdown, Avatar, Space, Flex } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const { Text } = Typography;
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
  // getItem('Dashboard', '/admin/dashboard', <PieChartOutlined />),
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

  const handleMenuClick: MenuProps['onClick'] = (e) => {
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
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Title level={3} style={{  color: 'var(--color-primary-600)', textAlign: 'center', margin: '16px 0' }}>
          Bookstore
        </Title>
        <Menu
          theme="light"
          defaultSelectedKeys={['/admin/dashboard']}
          mode="inline"
          items={adminMenuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Dropdown menu={{ items: userMenu }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} size="large"/>
                <Flex vertical align="flex-start">
                  <Text>
                    {user?.name || 'Hi, Admin'}
                  </Text>
                  <Text type='secondary'>
                    {user?.email}
                  </Text>
                </Flex>
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