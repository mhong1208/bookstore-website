import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainHeader from '../MainHeader'; // Import the new header
import MainFooter from '../MainFooter';

const { Content } = Layout;

const MainLayout: React.FC = () => (
  <Layout>
    <MainHeader />
    <Content>
        <Outlet />
    </Content>
    <MainFooter />
  </Layout>
);

export default MainLayout;