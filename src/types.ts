export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  url: string;
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
  orderItems: OrderItem[];
  customerId: number;
  pickup: Date;
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
