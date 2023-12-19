import { axios } from "./index";
import Error, { ErrorProps } from "next/error";
import { Product } from "~/types";

const baseUrl = `/products`;

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};

export const saveProducts = async ({ arg: product }: { arg: Product }) => {
  if (!product) {
    throw new Error({ message: "Product is undefined", statusCode: 400 });
  }

  const { id, ...productData } = product;
  try {
    await axios({
      method: id ? "PUT" : "POST",
      url: id ? `${baseUrl}/${id}` : baseUrl,
      data: productData,
    });
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};
