import { getAllProductsService, getProductByIdService, createProductService, deleteProductByIdService, updateProductByIdService} from "../services/products.services.js";

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params; 
        const product = await getProductByIdService(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = await createProductService(req.body);
        res.status(201).json({message: 'Producto creado exitosamente', product: newProduct});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteProductByIdService(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
}

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await updateProductByIdService(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
}