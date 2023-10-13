import { Divide } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";

export default function CategoryList({}) {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {data?.map((product: Product) => (
          <TabsTrigger key={product.id} value={product.name}>
            {product.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
