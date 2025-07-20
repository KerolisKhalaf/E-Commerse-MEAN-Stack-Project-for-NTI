export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  owner?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 