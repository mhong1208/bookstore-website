import React from 'react';
import { Card, Col, Row, Statistic, Typography, List } from 'antd';
import {
  ArrowUpOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

// --- Dữ liệu giả lập (Mock data) ---
// Sau này, bạn sẽ thay thế phần này bằng cách gọi API (ví dụ: dùng React Query)
const dashboardData = {
  totalUsers: 1250,
  totalProducts: 350,
  totalOrders: 4500,
  totalRevenue: 540500,
  revenueIncrease: 11.2,
};

const recentOrders = [
  { id: 'ORD-001', user: 'Nguyễn Văn A', total: 1500, status: 'Completed' },
  { id: 'ORD-002', user: 'Trần Thị B', total: 800, status: 'Processing' },
  { id: 'ORD-003', user: 'Lê Văn C', total: 2200, status: 'Completed' },
];
// ---------------------------------

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      
      {/* 1. Hàng thống kê KPI */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng Doanh Thu"
              value={dashboardData.totalRevenue}
              precision={0}
              prefix={<DollarCircleOutlined />}
              suffix="VNĐ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng Đơn Hàng"
              value={dashboardData.totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng Người Dùng"
              value={dashboardData.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng Sản Phẩm"
              value={dashboardData.totalProducts}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 2. Hàng thông tin & biểu đồ (ví dụ) */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={16}>
          <Card title="Đơn Hàng Gần Đây">
            <List
              itemLayout="horizontal"
              dataSource={recentOrders}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="#">{item.id}</a>}
                    description={`Khách hàng: ${item.user} - Trạng thái: ${item.status}`}
                  />
                  <div>{item.total.toLocaleString()} VNĐ</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Tăng Trưởng Doanh Thu">
            <Statistic
              title="So với tháng trước"
              value={dashboardData.revenueIncrease}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            {/* Bạn có thể thêm một biểu đồ nhỏ (tiny chart) ở đây sau */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;