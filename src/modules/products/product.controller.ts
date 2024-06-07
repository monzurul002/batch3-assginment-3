import { Request, Response } from 'express';

import { ProductService } from './product.service';
import { productValidationSchema } from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodParsedData = productValidationSchema.parse(product);

    const result = await ProductService.createProductToDB(zodParsedData);
    res.status(200).send({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const query: any = {};
    const search = req.query.searchTerm;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }
    const result = await ProductService.getAllProduct(query);

    if (result.length === 0 || !result) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    if (search) {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${search}' fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err?.message || 'failed to get product',
      error: err,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
};
