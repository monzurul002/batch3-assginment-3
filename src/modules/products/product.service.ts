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

const getProductById = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductFromDB = async (id: string, updateData: object) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });

  return result;
};

const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id: id });
  return result;
};

export const ProductService = {
  createProductToDB,
  getAllProduct,
  getProductById,
  updateProductFromDB,
  deleteProduct,
};
