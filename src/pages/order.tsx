import React, { useState } from "react";
import CategoryNavigation from "../components/categoryList";
import ProductList from "../components/ProductsListUser";
import Cart from "../components/Cart";
import { Category } from "~/types";
import { Product } from "~/types";
import useSWR from "swr";
import { getAllProducts } from "~/api/products";
import PrivateRoute from "~/components/PrivateRoute";

const OrderPage: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR("products", getAllProducts);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  if (!products) return null;

  return (
    <PrivateRoute>
      <div className="container mx-auto flex h-screen flex-col p-4 md:flex-row">
        <div className="md:w-2/3 md:pr-4">
          <h1 className="mb-4 text-2xl font-semibold">Webshop</h1>

          <CategoryNavigation
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <ProductList
            products={products}
            selectedCategory={selectedCategory}
            addToCart={addToCart}
          />
        </div>

        <div className="mt-4 md:mt-0 md:w-1/3">
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default OrderPage;
