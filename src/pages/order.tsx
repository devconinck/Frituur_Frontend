import React, { useState } from "react";
import CategoryList from "../components/categoryList";
import ProductList from "../components/ProductsListUser";
import Cart from "../components/Cart";
import { CartItem, Category } from "~/types";
import { Product } from "~/types";
import useSWR from "swr";
import { getAllProducts } from "~/api/products";
import PrivateRoute from "~/components/PrivateRoute";
import { Separator } from "~/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

const OrderPage: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products"], getAllProducts);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
  };

  if (!products) return null;

  return (
    <PrivateRoute>
      <div className="container mx-auto flex h-screen flex-col p-4 md:flex-row">
        <div className=" md:w-2/3 md:pr-4">
          <h1 className=" mb-2 text-2xl font-semibold">Create your order</h1>
          <Separator className="mb-4" />

          <CategoryList
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
