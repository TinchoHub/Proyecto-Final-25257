import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('<h2>Productos</h2>');
});

router.post('/', (req, res) => {
    res.send('Hola desde el post');
});

router.put('/', (req, res) => {
    res.send('Hola desde el put');
});

router.delete('/', (req, res) => {
    res.send('Hola desde el delete');
});

export default router;