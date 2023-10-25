import { ScrollArea, ScrollBar } from "./scroll-area";
import { Button } from "./button";
import useSWR from "swr";
import { fetcher } from "~/pages/api";
type Category = {
  id: number;
  name: string;
};

export default function CategoryList() {
  const { data: categories = [] } = useSWR("categories", fetcher);

  return (
    <>
      <ScrollArea className="m-7 pb-7">
        <div className="flex overflow-x-hidden">
          {categories.map((category: Category) => (
            <Button
              variant={"ghost"}
              key={category.id}
              className="whitespace-nowrap "
            >
              {category.name}
            </Button>
          ))}

          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </>
  );
}
