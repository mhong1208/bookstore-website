import type { ICategory } from "./category";

export interface IProduct {
  id: any,
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
  categories: ICategory[] | string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}