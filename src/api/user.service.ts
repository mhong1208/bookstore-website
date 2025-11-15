import type { IUser } from '../types/user';
import axiosClient from './axios-client';

export const userService = {
  getAll: (): Promise<{ data: IUser[] }> => {
    return axiosClient.get('/api/users');
  },

  update: (id: string, data: Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>): Promise<{ data: IUser }> => {
    return axiosClient.put(`/api/users/${id}/status`, data);
  },
};
