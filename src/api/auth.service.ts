import axiosClient from "./axios-client";

export const authService = {
  login: (data: { email: string; password: string }): Promise<any> => {
    return axiosClient.post('/api/auth/login', data);
  },

  logout: (): void => {
    localStorage.removeItem('token');
  },

  getProfile: (): Promise<any> => {
    return axiosClient.get('/api/auth/me');
  }
};
