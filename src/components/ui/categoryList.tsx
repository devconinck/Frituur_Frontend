import { api } from "~/utils/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Button } from "./button";

export default function CategoryList() {
  const { data } = api.categories.getAll.useQuery();

  return (
    <>
      <ScrollArea className="mx-7">
        <div className="">
          {data?.map((category) => (
            <Button variant={"ghost"} key={category.id} className=" ">
              {category.name}
            </Button>
          ))}

          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </>
  );
}
