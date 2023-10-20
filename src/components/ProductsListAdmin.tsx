import CategoryList from "./ui/categoryList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import useSWR from "swr";
import { getAll } from "~/pages/api";

type Product = {
  id: number;
  name: string;
  price: number;
  url: string;
};

export default function ProductsListAdmin() {
  const { data: products = [], isLoading, error } = useSWR("products", getAll);

  return (
    <>
      <div className="flex flex-row">
        <div className=" h-full w-full">
          <CategoryList />
          <div>
            <ScrollArea className="h-96 w-full ">
              <div className="flex flex-col">
                {products?.map((product: Product) => (
                  <div key={product.id} className="mx-8">
                    <div className="flex justify-between rounded-lg border p-4">
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
                      <div className="flex grow items-center justify-end pr-3">
                        <div className="pr-6 text-xl text-indigo-600">
                          €{product.price}
                        </div>
                        <div className="flex">
                          <Input
                            className="shrink-1 w-16 rounded text-center"
                            placeholder="Qty"
                          ></Input>
                          <Button className="text-bold">edit product</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
