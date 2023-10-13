import { api } from "~/utils/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import { Category } from "@prisma/client";

export default function CategoryList() {
  const { data } = api.categories.getAll.useQuery();

  return (
    <>
      <div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-12">
            {data?.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
