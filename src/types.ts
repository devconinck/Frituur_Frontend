export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  url: string;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
  description: string;
};
