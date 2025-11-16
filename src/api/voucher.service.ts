import type { IVoucher } from '../types/voucher';
import axiosClient from './axios-client';

const voucherService = {
  getVouchers: (): Promise<any> => {
    return axiosClient.get('/api/vouchers');
  },

  getVoucherById: (id: string): Promise<IVoucher> => {
    return axiosClient.get(`/api/vouchers/${id}`);
  },

  createVoucher: (data: any): Promise<IVoucher> => {
    return axiosClient.post('/api/vouchers', data);
  },

  updateVoucher: (id: string, data: Partial<any>): Promise<IVoucher> => {
    return axiosClient.put(`/api/vouchers/${id}`, data);
  },

  deleteVoucher: (id: string): Promise<void> => {
    return axiosClient.delete(`/api/vouchers/${id}`);
  },

  applyVoucher: (voucherCode: string, orderAmount: number): Promise<{ discountAmount: number }> => {
    return axiosClient.post('/api/vouchers/apply', { voucherCode, orderAmount });
  }
};

export default voucherService;