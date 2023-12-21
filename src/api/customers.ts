import { axios } from "./index";
import { Category } from "~/types";

const baseUrl = `/customers`;

export const updateCustomer = async ({
  id,
  name,
  lastName,
}: {
  id: number;
  name: string;
  lastName: string;
}): Promise<Category> => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, {
      name,
      lastName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
