import { api } from "~/utils/api";
import CategoryList from "./ui/categoryList";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProductsList() {
  const { data } = api.products.getAll.useQuery();

  const List = () => {
    const ListItems = data?.map((product) => (
      <div className="rounded-lg border p-4 shadow-md">
        <div className="mb-2">
          <img
            src={product.url}
            alt={product.name}
            className="h-40 w-40 rounded-lg object-cover"
          />
        </div>
        <div className="mb-2 text-xl font-semibold">{product.name}</div>
        <div className="mb-4 text-gray-600">{product.name}</div>
        <div className="flex items-center justify-between">
          <div className="text-xl text-indigo-600">${product.name}</div>
          <div className="flex">
            <button className="rounded bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">
              Add to Cart
            </button>
            <input
              type="number"
              min="1"
              className="ml-2 w-16 rounded border border-gray-300 text-center"
              placeholder="Qty"
            />
          </div>
        </div>
      </div>
    ));
    return <ul className="w-1/2 md:ml-24">{ListItems}</ul>;
  };
  return (
    <>
      <div>
        <CategoryList />
        <div className="flex flex-col">
          {data?.map((product) => (
            <div className="mx-8">
              <div className="flex justify-between rounded-lg border p-4">
                <div className="mb-2 flex justify-between">
                  <img
                    src={product.url}
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
        </div>
      </div>
    </>
  );
}
