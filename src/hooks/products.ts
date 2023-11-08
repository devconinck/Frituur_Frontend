import { useQuery } from "@tanstack/react-query";
import { number } from "zod";
import {
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "~/pages/api/products";
import { Product } from "~/types";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

const useGetOneProduct = (productId: number) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => getOneProduct(productId),
  });
};

export const useUpdateProduct = async ({
  productId,
  productData,
}: {
  productId: number;
  productData: Product;
}) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => updateProduct(productId, productData),
  });
};
