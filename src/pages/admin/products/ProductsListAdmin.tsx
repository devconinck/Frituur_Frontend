import CategoryList from "../../../components/ui/categoryList";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import useSWR from "swr";
import { fetcher } from "src/pages/api/index";
import { Product } from "src/types";

export default function ProductsListAdmin({
  products,
}: {
  products: Product[];
}) {
  // Define a state to track which card is currently expanded for editing
  const [expandedCard, setExpandedCard] = useState(0);

  const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  return (
    <div className="flex flex-row">
      <div className="h-full w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product: Product) => (
            <div key={product.id} className="">
              <div
                className={` items-center justify-center rounded-lg border p-4 ${
                  expandedCard === product.id ? "expanded" : ""
                }`}
              >
                <div className="mb-2 flex justify-between">
                  <img
                    src={`/productImages/${product.url}`}
                    alt={product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                </div>
                <div className="mb-2 flex items-center px-8 text-xl font-semibold">
                  {product.name}
                </div>
                <div className="flex items-center justify-between pr-3">
                  {expandedCard !== product.id ? (
                    <Button
                      variant={"destructive"}
                      onClick={() => setExpandedCard(product.id)}
                      className="text-bold"
                    >
                      Edit Product
                    </Button>
                  ) : (
                    <div className="grid grid-cols-2">
                      <div>
                        <label>Name</label>
                        <input
                          type="text"
                          value={editedProduct.name}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label>Description</label>
                        <textarea
                          value={editedProduct.description}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label>Price</label>
                        <input
                          type="number"
                          value={editedProduct.price}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              price: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div>
                        <Button variant={"ghost"} className="text-bold">
                          Save
                        </Button>
                        <Button
                          onClick={() => setExpandedCard(0)}
                          className="text-bold"
                          variant={"ghost"}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
