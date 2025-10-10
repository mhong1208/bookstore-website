
import React, { useState } from 'react';
import { Layout, Menu, Button, Row, Col, Avatar, Drawer, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './styles.css';

const { Header } = Layout;

// Mock user state
const isLoggedIn = false;
const cartItemCount = 2; // Placeholder

const MainHeader: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const menuItems = (
    <>
      <Menu.Item key="1"><Link to="/">Trang Chủ</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/products">Sản Phẩm</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/about">Về Chúng Tôi</Link></Menu.Item>
      <Menu.Item key="4"><Link to="/contact">Liên Hệ</Link></Menu.Item>
    </>
  );

  const userActions = (
    <>
      <Link to="/cart" style={{ marginRight: '20px' }}>
        <Badge count={cartItemCount}>
          <ShoppingCartOutlined style={{ fontSize: '24px', color: 'var(--text-color)' }} />
        </Badge>
      </Link>
      {isLoggedIn ? (
        <Avatar size="large" icon={<UserOutlined />} />
      ) : (
        <>
          <Button style={{ marginRight: '10px' }}>Đăng Nhập</Button>
          <Button type="primary">Đăng Ký</Button>
        </>
      )}
    </>
  );

  return (
    <Header className="main-header">
      <Row justify="space-between" align="middle" style={{ height: '100%' }}>
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
        visible={drawerVisible}
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
