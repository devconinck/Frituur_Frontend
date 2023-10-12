import { Divide } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import { api } from "~/utils/api";

export default function ProductsList() {
  const { data } = api.products.getAll.useQuery();

  return (
    <>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          {data?.map((product) => (
            <TabsTrigger key={product.id} value={product.name}>
              {product.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
