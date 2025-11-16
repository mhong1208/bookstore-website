import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons';
import UpdateProfile from './components/update-profile';
import MyOrders from './components/my-orders';
import { useAuth } from '../../context/AuthContext';

const { Sider } = Layout;

const ProfilePage = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { key: '1', icon: <UserOutlined />, label: 'Thông tin tài khoản' },
    { key: '2', icon: <UnorderedListOutlined />, label: 'Danh sách đơn hàng' },
    { key: '3', icon: <LogoutOutlined />, label: <Button type="link" onClick={handleLogout}>Đăng xuất</Button> },
  ];

  return (
    <Layout style={{ minHeight: '100vh', width: '90vw', margin: '0 auto', paddingTop: 20}}>
      <Sider width={240} theme="light">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          style={{ height: '100%', borderRight: 0 }}
          items={menuItems}
        />
      </Sider>

      <div
        style={{
          flex: 1,
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%'}}>
          {selectedKey === '1' && <UpdateProfile />}
          {selectedKey === '2' && <MyOrders />}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
