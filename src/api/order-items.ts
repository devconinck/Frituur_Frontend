import axios from "axios";
import Error, { ErrorProps } from "next/error";
import { OrderItem } from "~/types";

const baseUrl = `http://localhost:8080/order-items`;

export const createOrderItem = async (
  OrderItemData: OrderItem,
): Promise<OrderItem> => {
  try {
    const response = await axios.post(baseUrl, OrderItemData);
    return response.data;
  } catch (error) {
    throw new Error(error as ErrorProps);
  }
};
