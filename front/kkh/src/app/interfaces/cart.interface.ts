import { Product } from './product.interface';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id?: string;
  items: CartItem[];
  total: number;
  itemCount: number;
  user?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 