import React, { useState, useEffect } from 'react';
import { Table, Spin } from 'antd';
import type { TableProps } from 'antd';
import orderService from '../../../../api/order.service';
import { useAuth } from '../../../../context/AuthContext';
import type { IOrder } from '../../../../types/order';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      orderService.getOrdersByUserId(user.id)
        .then(response => {
          setOrders(response);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          setLoading(false);
        });
    }
  }, [user]);

  const columns: TableProps<IOrder>['columns'] = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  if (loading) {
    return <Spin />;
  }

  return <Table columns={columns} dataSource={orders} rowKey="_id" />;
};

export default MyOrders;
