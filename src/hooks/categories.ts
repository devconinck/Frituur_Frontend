import { useQuery } from "@tanstack/react-query";
import { number } from "zod";
import { getAllCategories, getOneCategory } from "~/pages/api/categories";
import { Category } from "~/types";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

const useGetOnecategory = (categoryId: number) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => getOneCategory(categoryId),
  });
};
