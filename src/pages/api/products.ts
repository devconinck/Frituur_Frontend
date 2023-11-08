import axios from "axios";
import { Product } from "~/types";

const baseUrl = `http://localhost:8080/products`;

// Function to fetch all products
export const getAllProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products: ", error);
    throw error;
  }
};

// Function to fetch a single product by ID
export const getOneProduct = async (productId: number): Promise<Product> => {
  try {
    const response = await axios.get(`${baseUrl}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    throw error;
  }
};

// Function to create a new product
export const createProduct = async (productData: any) => {
  try {
    const response = await axios.post(baseUrl, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating a new product: ", error);
    throw error;
  }
};

export const updateProduct = async (productId: number, productData: any) => {
  try {
    const response = await axios.put(`${baseUrl}/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Function to delete a product by ID
export const deleteProduct = async (productId: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product by ID: ", error);
    throw error;
  }
};
