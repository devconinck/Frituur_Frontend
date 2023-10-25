import axios from "axios";

const baseUrl = `http://localhost:8080`;

export const fetcher = async (url: string) =>
  await axios.get(`${baseUrl}/${url}`).then((res) => res.data);

export async function getAll(url: string) {
  try {
    const { data } = await axios.get(`${baseUrl}/${url}`);
    console.log(data);
    return data.items;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOne(url: string, id: string) {
  const { data } = await axios.get(`${baseUrl}/${url}/${id}`);

  return data;
}
