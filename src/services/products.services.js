import {db} from '../firebase/config.js';
import {ProductModel} from '../models/products.models.js';
import { collection, getDoc, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

const collectionName = 'productos';

export const getAllProductsService = async () => {
    const productsCol = collection(db, collectionName);
    const productsSnapshot = await getDocs(productsCol);
    if (productsSnapshot.empty) {
        return [];
    }
    return productsSnapshot.docs.map(doc => new ProductModel({id: doc.id, ...doc.data()}));
}

export const getProductByIdService = async (id) => {
    const productDoc = doc(db, collectionName, id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
        return null;
    }
    return new ProductModel({id: productSnapshot.id, ...productSnapshot.data()});
}

export const createProductService = async (productData) => {
    if (!productData.nombre || !productData.precio) {
        throw new Error("Faltan datos obligatorios (nombre y precio)");
    }
    const productsCol = collection(db, collectionName);
    const newProductRef = await addDoc(productsCol, 
      { nombre: productData.nombre, 
        precio: Number(productData.precio), 
        stock: Number(productData.stock) || 0, 
        descripcion: productData.descripcion || "", 
        categoria: productData.categoria || "" 
      });
    return new ProductModel({id: newProductRef.id, ...productData});
}

export const deleteProductByIdService = async (id) => {
    const productDoc = doc(db, collectionName, id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
        return null;
    }
    await deleteDoc(productDoc);
    return true;
}

export const updateProductByIdService = async (id, updateData) => {
    const productDoc = doc(db, collectionName, id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
        return null;
    }
    await updateDoc(productDoc, updateData);
    return {id, ...productSnapshot.data(), ...updateData};
}