import type { ICategory } from "./category";

export interface IProduct {
  _id: string;
  title: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  author?: string;
  publisher?: string;
  publishedDate?: Date;
  coverImage?: string;
  categories: ICategory[] | string[]; // Can be populated or just IDs
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}