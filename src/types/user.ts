import { EUser } from '../common/enums/EUser';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  role: EUser;
  avatarUrl?: string;
  isActive: boolean;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}
