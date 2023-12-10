import axios from "axios";
import { OrderItem } from "~/types";

const baseUrl = `http://localhost:8080/order-items`;

export const getAllOrderItems = async (): Promise<OrderItem[] | null> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching all OrderItems: ", error);
    throw error;
  }
};

export const getOneOrderItem = async (
  OrderItemId: number,
): Promise<OrderItem> => {
  try {
    return await axios.get(`${baseUrl}/${OrderItemId}`).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching OrderItem by ID: ", error);
    throw error;
  }
};

export const saveOrderItems = async (OrderItem) => {
  if (!OrderItem) {
    // Handle the case where the OrderItem is undefined
    console.error("OrderItem is undefined");
    return;
  }

  const { id, ...OrderItemData } = OrderItem;
  await axios({
    method: id ? "PUT" : "POST",
    url: id ? `${baseUrl}/${id}` : baseUrl,
    data: OrderItemData,
  });
};

export const createOrderItem = async (
  OrderItemData: OrderItem,
): Promise<OrderItem> => {
  try {
    const response = await axios.post(baseUrl, OrderItemData);
    return response.data;
  } catch (error) {
    console.error("Error creating a new OrderItem: ", error);
    throw error;
  }
};

export const deleteOrderItem = async (
  url: string,
  { arg: id }: { arg: number },
) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};
