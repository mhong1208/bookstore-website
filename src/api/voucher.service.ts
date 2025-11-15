import type { IVoucher } from '../types/voucher';
import axiosClient from './axios-client';

export const voucherService = {
  getAll: (): Promise<{ data: IVoucher[] }> => {
    return axiosClient.get('/api/vouchers');
  },

  getById: (id: string): Promise<{ data: IVoucher }> => {
    return axiosClient.get(`/api/vouchers/${id}`);
  },

  create: (data: Omit<IVoucher, '_id' | 'createdAt' | 'updatedAt' | 'timesUsed'>): Promise<{ data: IVoucher }> => {
    return axiosClient.post('/api/vouchers', data);
  },

  update: (id: string, data: Partial<Omit<IVoucher, '_id' | 'createdAt' | 'updatedAt'>>): Promise<{ data: IVoucher }> => {
    return axiosClient.put(`/api/vouchers/${id}`, data);
  },

  remove: (id: string): Promise<any> => {
    return axiosClient.delete(`/api/vouchers/${id}`);
  },
};
