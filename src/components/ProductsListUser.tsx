import CategoryList from "./ui/categoryList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import useSWR from "swr";
import { fetcher } from "~/pages/api";
import AsyncData from "./AsyncData";

type Product = {
  id: number;
  name: string;
  price: number;
  url: string;
};

export default function ProductsListUser() {
  const { data: products = [], isLoading, error } = useSWR("products", fetcher);

  return (
    <>
      <div className="flex flex-row">
        <div className=" h-full w-2/3">
          <CategoryList />
          <div>
            <ScrollArea className="h-96 w-full ">
              <div className="flex flex-col">
                <AsyncData loading={isLoading} error={error}>
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
                            <Button className="">Add to Cart</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </AsyncData>
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex w-full">
          <h1 className="flex w-full items-center justify-center text-4xl">
            CART
          </h1>
        </div>
      </div>
    </>
  );
}
