import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

//post a product
router.post('/', ProductController.createProduct);
//get all data and search query
router.get('/', ProductController.getAllProduct);
//get single product
router.get('/:productId', ProductController.getProductById);
//single prouduct update
router.put('/:productId', ProductController.updateProduct);
//delete a product
router.delete('/:productId', ProductController.deleteProduct);
export const ProductRoutes = router;
