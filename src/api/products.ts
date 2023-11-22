import axios from "axios";
import { Product } from "~/types";

const baseUrl = `http://localhost:8080/products`;

export const getAllProducts = async (): Promise<Product[] | null> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching all products: ", error);
    throw error;
  }
};

export const getOneProduct = async (productId: number): Promise<Product> => {
  try {
    return await axios.get(`${baseUrl}/${productId}`).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    throw error;
  }
};

export const saveProducts = async ({ arg: product }) => {
  if (!product) {
    // Handle the case where the product is undefined
    console.error("Product is undefined");
    return;
  }

  const { id, ...productData } = product;
  await axios({
    method: id ? "PUT" : "POST",
    url: id ? `${baseUrl}/${id}` : baseUrl,
    data: productData,
  });
};

export const createProduct = async (productData: Product): Promise<Product> => {
  try {
    const response = await axios.post(baseUrl, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating a new product: ", error);
    throw error;
  }
};

export const deleteProduct = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};
