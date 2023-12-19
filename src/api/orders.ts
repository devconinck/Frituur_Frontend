import axios from "axios";
import { request } from "https";
import Error, { ErrorProps } from "next/error";
import { Order } from "~/types";

const baseUrl = `http://localhost:8080/orders`;

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching all Orders: ", error);
    throw new Error(error as ErrorProps);
  }
};

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  try {
    /*   const localStorage = window.localStorage;
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`; */
    return await axios.get(`${baseUrl}/user/${userId}`).then((res) => res.data);
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};

export const createOrder = async ({
  customerId,
}: {
  customerId: number;
}): Promise<Order> => {
  try {
    const pickup = new Date();
    const response = await axios.post(baseUrl, { customerId, pickup });
    return response.data;
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};
