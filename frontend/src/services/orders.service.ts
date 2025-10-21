import api from "./api";
import type { Order, PaginatedResponse } from "../types/order.types";

export async function getOrders(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Order>> {
  const response = await api.get<PaginatedResponse<Order>>(
    `/orders?page=${page}&page_size=${pageSize}`
  );
  console.log("Fetched orders:", response.data);
  return response.data;
}


export async function getOrderById(id: string): Promise<Order> {
  const response = await api.get<{ message: string; data: Order }>(
    `/orders/${id}`
  );
  return response.data.data;
}

export async function createOrder(orderData: Omit<Order, "id" | "created_at" >): Promise<Order> {
  const response = await api.post<{ message: string; data: Order }>(
    "/orders",
    orderData
  );
  return response.data.data;
}

export async function updateOrder(id: string, orderData: Partial<Omit<Order, "id" | "created_at" >>): Promise<Order> {
  const response = await api.put<{ message: string; data: Order }>(
    `/orders/${id}`,
    orderData
  );
  return response.data.data;
}


export async function deleteOrder(id: string): Promise<Order> {
  const response = await api.delete<{ message: string; data: Order }>(
    `/orders/${id}`
  );
  return response.data.data;
}
