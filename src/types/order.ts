import type { IUser } from "./user";
import type { IVoucher } from "./voucher";

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder {
  _id: string;
  user: string | IUser;
  orderItems: string[] | any[];
  shippingAddress: IShippingAddress;
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
}
