import type { IOrder } from '../types/order';
import axiosClient from './axios-client';

interface CreateOrderPayload {
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  orderItems: {
    book: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  discountAmount?: number;
  totalPrice: number;
  notes?: string;
}

const orderService = {
  createOrder: (payload: CreateOrderPayload): Promise<IOrder> => {
    return axiosClient.post('/api/orders', payload);
  },
  getAllOrders: (): Promise<any> => {
    return axiosClient.get('/api/orders');
  },
  getOrdersByUserId: (userId: string): Promise<IOrder[]> => {
    return axiosClient.get(`/api/orders/user/${userId}`);
  },
  updateOrderStatus: (orderId: string, payload: { status: string }): Promise<IOrder> => {
    return axiosClient.put(`/api/orders/${orderId}`, payload);
  },
};

export default orderService;
