import React from "react";
import { Category, Product } from "~/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface ProductListProps {
  products: Product[];
  selectedCategory: Category | null;
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  selectedCategory,
  addToCart,
}) => {
  return (
    <div className="">
      <h2 className="mb-2 text-xl font-semibold">
        {selectedCategory
          ? `Products in ${selectedCategory.name}`
          : "All Products"}
      </h2>
      <ScrollArea className="h-96 max-h-[500px] rounded-lg border p-2">
        <ul>
          {products
            .filter(
              (product) =>
                !selectedCategory || product.categoryId === selectedCategory.id,
            )
            .map((product) => (
              <li key={product.id} className="mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <img
                      src={`/productImages/${product.url}`}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg"
                    />
                    <div>
                      <span className="font-semibold">{product.name}</span>
                      <span className="block text-sm text-gray-500">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="rounded bg-blue-500 p-1 text-white"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default ProductList;
