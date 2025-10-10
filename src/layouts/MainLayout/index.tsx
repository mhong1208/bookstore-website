import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom'; // 👈 Outlet để render nội dung trang con

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/about">About</Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: '20px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <Outlet />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      My Awesome App ©2025 Created by You
    </Footer>
  </Layout>
);

export default MainLayout;