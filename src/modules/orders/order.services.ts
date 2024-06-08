import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrder = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);
  return result;
};

export const OrderServices = {
  createOrder,
};
