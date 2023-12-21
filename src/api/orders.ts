import { axios } from "./index";
import { Order } from "~/types";

const baseUrl = `/orders`;

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching all Orders: ", error);
    throw error;
  }
};

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  try {
    return await axios.get(`${baseUrl}/user/${userId}`).then((res) => res.data);
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await axios.get(`${baseUrl}/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
