import {Router} from 'express';
import {getProducts, getProductById, createProduct, updateProductById, deleteProductById} from '../controllers/products.controllers.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/crear', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;