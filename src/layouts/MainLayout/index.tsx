import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainHeader from '../MainHeader'; // Import the new header

const { Content, Footer } = Layout;

const MainLayout: React.FC = () => (
  <Layout>
    <MainHeader />
    <Content>
        <Outlet />
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Bookstore ©{new Date().getFullYear()} Created with Gemini
    </Footer>
  </Layout>
);

export default MainLayout;