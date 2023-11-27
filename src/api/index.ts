import axiosRoot from "axios";

const baseUrl = `http://localhost:8080`;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers["Authorization"];
};

export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);

  return data;
};
