import { Category, Product } from "~/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import Image from "next/image";
import { Button } from "./ui/button";

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
    <div className="rounded-lg shadow-md">
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
              <li
                key={product.id}
                className="flex justify-between border-b py-2"
              >
                <div className="flex space-x-4">
                  <Image
                    src={`/productImages/${product.url}`}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg"
                  />
                  <p className="font-semibold">{product.name}</p>
                  <p>
                    ${product.price ? Number(product.price).toFixed(2) : "0.00"}
                  </p>
                </div>
                <Button
                  className="rounded px-4 py-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </li>
            ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default ProductList;
