import React, { useState } from 'react';
import { Layout, Menu, Button, Row, Col, Avatar, Drawer, Badge, Dropdown, Space } from 'antd'; // <-- THAY ĐỔI: Thêm Dropdown, Space
import type { MenuProps } from 'antd'; // <-- THAY ĐỔI: Import kiểu MenuProps
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserOutlined, 
  MenuOutlined, 
  ShoppingCartOutlined, 
  DownOutlined // <-- THAY ĐỔI: Thêm icon
} from '@ant-design/icons';
import './styles.css';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectCartTotalItems } from '../../redux/cartSlice';

const { Header } = Layout;

const MainHeader: React.FC = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { user, logout } = useAuth();
  const cartItemCount = useSelector(selectCartTotalItems);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const menuItems = (
    <>
      <Menu.Item key="1"><Link to="/">Trang Chủ</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/products">Sản Phẩm</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/about">Về Chúng Tôi</Link></Menu.Item>
      <Menu.Item key="4"><Link to="/contact">Liên Hệ</Link></Menu.Item>
    </>
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminMenu: MenuProps['items'] = [
    {
      key: 'admin_dashboard',
      label: (
        <Link to="/admin/dashboard">Trang quản trị</Link>
      ),
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      onClick: handleLogout,
      danger: true, 
    },
  ];

  const customerMenu: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link to="/profile">Tài khoản của tôi</Link>
      ),
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      onClick: handleLogout,
      danger: true,
    },
  ];


  const userActions = (
    <>
      <Link to="/cart" style={{ marginRight: '20px' }}>
        <Badge count={cartItemCount}>
          <ShoppingCartOutlined style={{ fontSize: '24px', color: 'var(--text-color)' }} />
        </Badge>
      </Link>

      {user ? (
        <Dropdown 
          menu={{ items: user.role === 'ADMIN' ? adminMenu : customerMenu }} 
          placement="bottomRight" 
          arrow
        >
          <a onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar size="large" icon={<UserOutlined />} />
            <DownOutlined style={{ marginLeft: 8, color: 'var(--text-color)' }} />
          </a>
        </Dropdown>
      ) : (
        <>
          <Button type="default" size="large" style={{ marginRight: '10px' }} onClick={() => navigate('/login')}>Đăng Nhập</Button>
          <Button type="primary" size="large" onClick={() => navigate('/register')}>
            Đăng ký
          </Button>
        </>
      )}
    </>
  );

  return (
    <Header className="main-header">
      <Row justify="space-between" align="middle" wrap={false} style={{ height: '100%' }}>
        <Col className="logo">
          <Link to="/">Bookstore</Link>
        </Col>

        <Col className="desktop-menu">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            {menuItems}
          </Menu>
        </Col>

        <Col className="user-actions">
          {userActions}
        </Col>

        <Col className="mobile-menu-icon">
          <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
        </Col>
      </Row>

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <Menu mode="vertical" onClick={closeDrawer}>
          {menuItems}
        </Menu>
        <div className="mobile-drawer-actions">
          {userActions}
        </div>
      </Drawer>
    </Header>
  );
};

export default MainHeader;