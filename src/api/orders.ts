import axios from "axios";
import { Order } from "~/types";

const baseUrl = `http://localhost:8080/Orders`;

export const getAllOrders = async (): Promise<Order[] | null> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching all Orders: ", error);
    throw error;
  }
};

export const getOneOrder = async (OrderId: number): Promise<Order> => {
  try {
    return await axios.get(`${baseUrl}/${OrderId}`).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching Order by ID: ", error);
    throw error;
  }
};

export const saveOrders = async (Order) => {
  if (!Order) {
    // Handle the case where the Order is undefined
    console.error("Order is undefined");
    return;
  }

  const { id, ...OrderData } = Order;
  await axios({
    method: id ? "PUT" : "POST",
    url: id ? `${baseUrl}/${id}` : baseUrl,
    data: OrderData,
  });
};

export const createOrder = async (OrderData: Order): Promise<Order> => {
  try {
    const response = await axios.post(baseUrl, OrderData);
    return response.data;
  } catch (error) {
    console.error("Error creating a new Order: ", error);
    throw error;
  }
};

export const deleteOrder = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};
