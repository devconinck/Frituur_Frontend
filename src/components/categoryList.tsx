import React from "react";
import { Category } from "~/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { getAllCategories } from "~/api/categories";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Error from "./Error";

interface CategoryListProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (isLoading) return <Loader />;
  //@ts-ignore
  if (error) return <Error error={data.error} />;

  const categories = data;

  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">Categories</h2>
      <ScrollArea className="whitespace-nowrap rounded-lg border p-4">
        <div className="flex space-x-4 overflow-x-auto">
          {categories?.map((category: Category) => (
            <Button
              key={category.id}
              variant={category === selectedCategory ? "default" : "ghost"}
              className={`cursor-pointer  transition duration-150 `}
              onClick={() => setSelectedCategory(category)}
              data-cy={`category-${category.name}`}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategoryList;
