import axios from "axios";

const baseUrl = `http://localhost:8080`;

export async function getAll(url: string) {
  const { data } = await axios.get(`${baseUrl}/${url}`);

  return data.items;
}

export async function getOne(url: string, id: string) {
  const { data } = await axios.get(`${baseUrl}/${url}/${id}`);

  return data;
}
