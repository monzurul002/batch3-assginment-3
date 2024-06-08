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

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductById(productId);

    //if product doesnot found
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
    console.log(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const result = await ProductService.updateProductFromDB(
      productId,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong!',
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
