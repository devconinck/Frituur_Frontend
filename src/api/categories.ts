import { axios } from "./index";
import Error, { ErrorProps } from "next/error";
import { Category } from "~/types";

const baseUrl = `/categories`;

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};

export const createCategory = async ({
  name,
}: {
  name: string;
}): Promise<Category> => {
  try {
    const response = await axios.post(baseUrl, { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (CategoryId: number): Promise<Category> => {
  try {
    const response = await axios.delete(`${baseUrl}/${CategoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
