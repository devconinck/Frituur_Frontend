import axios from "axios";
import { Order } from "~/types";

const baseUrl = `http://localhost:8080/orders`;

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

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  try {
    return await axios.get(`${baseUrl}/user/${userId}`).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching Orders by User ID: ", error);
    throw error;
  }
};

export const saveOrders = async (Order: Order) => {
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
    console.error("Error creating a new Order: ", error);
    throw error;
  }
};
