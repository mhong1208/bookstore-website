export interface IVoucher {
  _id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  expiresAt: string; // Using string for date to simplify form handling
  isActive: boolean;
  maxUsage?: number;
  timesUsed?: number;
  createdAt: string;
  updatedAt: string;
}