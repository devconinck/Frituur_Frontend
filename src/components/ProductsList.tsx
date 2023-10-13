import { api } from "~/utils/api";
import CategoryList from "./ui/categoryList";

export default function ProductsList() {
  const { data } = api.products.getAll.useQuery();

  return (
    <>
      <div>
        {data?.map((product) => <div key={product.id}>{product.name}</div>)}
      </div>
      {/*       <CategoryList data={data} />
       */}{" "}
    </>
  );
}
