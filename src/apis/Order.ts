import axios from "axios"
import { ServerURL } from "../constants"
import { OrderData } from "../contexts/OrderContext";

export const getOrders = async () => {
  let error: any = null;
  let data: OrderData[] | null = null;
  let status: any = null;

  try {
    const response = await axios.get(ServerURL + "/orders");
    if (response.data) {
      data = response.data;
    }
  }
  catch (e) {
    error = e;
    status = "failed";
  }

  return { error, data, status: "success" }
}

export const addOrder = async (orderData: OrderData) => {
  try {

    const response = await axios.post(ServerURL + "/addOrder", { ...orderData, price: Number(orderData.price) });
    if (response.data) {
      return { error: null, data: "Comanda a fost adăugată cu succes!", status: "success" }
    }
  } catch (e) {
    return { error: e, data: null, status: "faild" }
  }
}

export const assignOrder = async (username: string, orderId: number) => {
  try {

    const response = await axios.post(ServerURL + "/assignOrder", { username, orderId });
    if (response.data) {
      return { error: null, data: "Comanda a fost atribuită cu succes!", status: "success" }
    }
  } catch (e) {
    return { error: e, data: null, status: "faild" }
  }
}

export const finalizeOrder = async (orderId: number) => {
  try {

    const response = await axios.post(ServerURL + "/finalizeOrder", { orderId });
    if (response.data) {
      return { error: null, data: "Comanda a fost finalizată cu succes!", status: "success" }
    }
  } catch (e) {
    return { error: e, data: null, status: "faild" }
  }
}