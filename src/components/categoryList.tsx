import React from "react";
import { Category } from "~/types";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import useSWR from "swr";
import { getAllCategories } from "~/api/categories";

interface CategoryListProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR("categories", getAllCategories);
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">Categories</h2>
      <ScrollArea className="whitespace-nowrap rounded-lg border p-4">
        <div className="flex space-x-4 overflow-x-auto">
          {categories?.map((category: Category) => (
            <Button
              key={category.id}
              variant={category === selectedCategory ? "default" : "ghost"}
              className={`cursor-pointer  transition duration-150 hover:text-blue-400`}
              onClick={() => setSelectedCategory(category)}
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
