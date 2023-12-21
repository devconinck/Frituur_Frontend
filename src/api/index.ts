import axiosRoot from "axios";

const baseUrl = process.env.URL || "http://localhost:8080";

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};
export const post = async (url: string, arg: any): Promise<any> => {
  try {
    const { data } = await axios.post(url, arg);

    return data;
  } catch (error) {
    throw error;
  }
};
