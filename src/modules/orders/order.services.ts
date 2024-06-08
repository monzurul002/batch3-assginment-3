import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrder = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);
  return result;
};
const getAllOrders = async (query: TOrder) => {
  const result = await OrderModel.find(query);
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
};
