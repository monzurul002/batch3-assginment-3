import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

//create product
const createProductToDB = async (product: TProduct) => {
  try {
    const result = await ProductModel.create(product);

    return result;
  } catch (error) {
    console.log(error);
  }
};

//get all products
const getAllProduct = async (query: any) => {
  const result = await ProductModel.find(query);
  return result;
};

//get product by id
const getProductById = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

//udate product
const updateProduct = async (id: string, payload: TProduct) => {
  const updateData = payload;
  console.log(updateData);
  const result = await ProductModel.findByIdAndUpdate(
    { _id: id },
    { $set: updateData },
    { new: true },
  );
  return result;
};
//delete product
const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id: id });
  return result;
};

export const ProductService = {
  createProductToDB,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
