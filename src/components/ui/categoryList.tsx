import { ScrollArea, ScrollBar } from "./scroll-area";
import { Button } from "./button";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <ScrollArea className="m-7 pb-7">
        <div className="flex overflow-x-hidden">
          {categories?.map((category: Category) => (
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
