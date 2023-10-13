import { api } from "~/utils/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";

export default function CategoryList() {
  const { data } = api.categories.getAll.useQuery();

  return (
    <>
      <div className="md:max-w-lg ">
        <ScrollArea>
          <Tabs defaultValue="Drinks" className="w-[500px]">
            <TabsList className="grid w-full grid-cols-12 ">
              {data?.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </ScrollArea>
      </div>
    </>
  );
}
