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

export const ProductService = {
  createProductToDB,
};
