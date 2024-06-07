import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductToDB = async (product: TProduct) => {
  try {
    const result = await ProductModel.create(product);
    console.log(result, 'from service');
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async (query: any) => {
  const result = await ProductModel.find(query);
  return result;
};

export const ProductService = {
  createProductToDB,
  getAllProduct,
};
