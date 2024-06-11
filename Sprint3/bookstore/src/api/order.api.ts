import { Order, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

export const order = async (orderData : OrderSheet) => {
    return requestHandler<OrderSheet>("post", "/orders", orderData)
}

export const fetchOrders = async () => {
    const response = await httpClient.get<Order[]>("/orders");
        return response.data;
}

export const fetchOrder = async (orderId : number) => {
    const response = await httpClient.get(`/orders/${orderId}`);
    return response.data;
}