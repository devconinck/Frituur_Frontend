export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  url?: string;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
};

export type OrderItem = {
  productId: number;
  orderId: number;
  quantity: number;
};

export type Order = {
  id: number;
  items: OrderItem[];
  customerId: number;
  customer: Customer;
  createdAt: Date;
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  phone: string;
  orders: Order[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};
