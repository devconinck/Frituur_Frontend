import axios from "axios";
import Error, { ErrorProps } from "next/error";
import { Category } from "~/types";

const baseUrl = `http://localhost:8080/categories`;

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};

export const createCategory = async (name: string): Promise<Category> => {
  try {
    const response = await axios.post(baseUrl, name);
    return response.data;
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};

export const deleteCategory = async (CategoryId: number): Promise<Category> => {
  try {
    const response = await axios.delete(`${baseUrl}/${CategoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};
