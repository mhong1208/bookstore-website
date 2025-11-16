import type { IVoucher } from "./voucher";

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrder {
  _id: string;
  user: any;
  orderItems: string[] | any[];
  shippingAddress: string;
  subtotal: number;
  discountAmount: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  status: OrderStatus;
  voucher?: string | IVoucher;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  shippingMethod: string

}
