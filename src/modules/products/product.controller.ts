import { Request, Response } from 'express';

import { ProductService } from './product.service';
import { productValidationSchema } from './product.validation';

//create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodParsedData = productValidationSchema.parse(product);

    const result = await ProductService.createProductToDB(zodParsedData);

    //send response
    res.status(200).send({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went wrong!',
      error: error,
    });
  }
};

//get All products and Search data
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const query: any = {};
    const search = req.query.searchTerm as string;

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

//get product by id searching
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductById(productId);

    //if product doesn't found
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    res.status(200).send({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong!',
    });
  }
};

//update  a product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updatedData = req.body;
    const zodData = productValidationSchema.parse(updatedData);
    const result = await ProductService.updateProduct(id, zodData);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error,
    });
  }
};

// delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    const result = await ProductService.deleteProduct(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
