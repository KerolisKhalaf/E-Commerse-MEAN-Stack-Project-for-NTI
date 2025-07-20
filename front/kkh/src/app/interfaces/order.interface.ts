import { CartItem } from './cart.interface';
import { User } from './user.interface';

export interface Order {
  _id: string;
  user: User | string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
} 