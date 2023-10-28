import axios from "axios";
import { Product } from "~/types";

const baseUrl = `http://localhost:8080`;

export const fetcher = async (url: string) =>
  await axios.get(`${baseUrl}/${url}`).then((res) => res.data);

export async function getAll(url: string) {
  try {
    const response = await axios.get(`${baseUrl}/${url}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOne(url: string, id: string) {
  const { data } = await axios.get(`${baseUrl}/${url}/${id}`);

  return data;
}

export const save = async (url: string, { arg: body }: { arg: Product }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? "PUT" : "POST",
    url: `${baseUrl}/${url}/${id ?? ""}`,
    data: values,
  });
};

export async function deleteById(url: string, id: string) {
  try {
    const { data } = await axios.delete(`${baseUrl}/${url}/${id}`);
    console.log(data);
    return data.items;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
