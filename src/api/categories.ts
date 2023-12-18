import axios from "axios";
import { Category } from "~/types";

const baseUrl = `http://localhost:8080/categories`;

export const getAllCategories = async (): Promise<Category[] | null> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching all products: ", error);
    throw error;
  }
};

// Function to fetch a single Category by ID
export const getOneCategory = async (CategoryId: number): Promise<Category> => {
  try {
    const response = await axios.get(`${baseUrl}/${CategoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Category by ID: ", error);
    throw error;
  }
};

// Function to create a new Category
export const createCategory = async (name: string) => {
  try {
    console.log(name);
    const response = await axios.post(baseUrl, name);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating a new Category: ", error);
    throw error;
  }
};

// Function to update an existing Category
export const updateCategory = async (CategoryId: number, CategoryData: any) => {
  try {
    const response = await axios.put(`${baseUrl}/${CategoryId}`, CategoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating Category: ", error);
    throw error;
  }
};

// Function to delete a Category by ID
export const deleteCategory = async (CategoryId: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/${CategoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Category by ID: ", error);
    throw error;
  }
};
