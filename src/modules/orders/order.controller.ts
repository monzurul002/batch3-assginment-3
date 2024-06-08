import { Request, Response } from 'express';
import { ProductModel } from '../products/product.model';
import { orderValidationSchema } from './order.validation';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;

    const product = await ProductModel.findById(payload.productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    if (
      product.inventory.quantity < payload.quantity ||
      !product.inventory.inStock
    ) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    }
    product.inventory.quantity -= payload.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    const zodParsedData = orderValidationSchema.parse(payload);

    const result = await OrderServices.createOrder(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error.issues && error.issues.length > 0 && error.issues[0].message) {
      res.status(500).json({
        success: false,
        message: error.issues[0].message || 'Something went wrong',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error?.message || 'Something went wrong',
        error: error,
      });
    }
  }
};

export const OrderController = {
  createOrder,
};
