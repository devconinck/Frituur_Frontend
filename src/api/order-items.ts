import { axios } from "./index";
import Error, { ErrorProps } from "next/error";
import { OrderItem } from "~/types";

const baseUrl = `/order-items`;

export const createOrderItem = async (
  OrderItemData: OrderItem,
): Promise<OrderItem> => {
  try {
    const response = await axios.post(baseUrl, OrderItemData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
