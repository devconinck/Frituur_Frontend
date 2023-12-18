import axios from "axios";
import { Customer } from "~/types";

const baseUrl = `http://localhost:8080/Customers`;

export const getAllCustomers = async (): Promise<Customer[] | null> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching all Customers: ", error);
    throw error;
  }
};

export const getOneCustomer = async (CustomerId: number): Promise<Customer> => {
  try {
    return await axios.get(`${baseUrl}/${CustomerId}`).then((res) => res.data);
  } catch (error) {
    console.error("Error fetching Customer by ID: ", error);
    throw error;
  }
};

export const saveCustomers = async (customer: Customer) => {
  if (!customer) {
    // Handle the case where the Customer is undefined
    console.error("Customer is undefined");
    return;
  }

  const { id, ...CustomerData } = customer;
  await axios({
    method: id ? "PUT" : "POST",
    url: id ? `${baseUrl}/${id}` : baseUrl,
    data: CustomerData,
  });
};

export const createCustomer = async (
  CustomerData: Customer,
): Promise<Customer> => {
  try {
    const response = await axios.post(baseUrl, CustomerData);
    return response.data;
  } catch (error) {
    console.error("Error creating a new Customer: ", error);
    throw error;
  }
};
