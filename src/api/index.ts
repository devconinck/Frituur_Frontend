import axiosRoot from "axios";

const baseUrl = `http://localhost:8080`;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token: string) => {
  console.log("setting token", token);
  if (token) axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["authorization"];
};
export const post = async (url: string, { arg }: any) => {
  const { data } = await axios.post(url, arg);

  return data;
};
