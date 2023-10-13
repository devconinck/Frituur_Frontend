import { api } from "~/utils/api";
import CategoryList from "./ui/categoryList";
import { Separator } from "./ui/separator";

export default function ProductsList() {
  const { data } = api.products.getAll.useQuery();
  const List = () => {
    const ListItems = data?.map((product) => (
      <div>
        <li className="" key={product.id}>
          <img src={product.url} className="flex aspect-auto w-[100px]" />
          {product.name}
        </li>
        <Separator />
      </div>
    ));
    return <ul className="w-1/2 md:ml-24">{ListItems}</ul>;
  };
  return (
    <>
      <div>
        <CategoryList />
        <List />
      </div>
    </>
  );
}
