import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/users.routes.js';
import productRoutes from './routes/products.routes.js';
import cors from 'cors';

const app = express();

//app.use(express.static('public'));
app.use(cors());
app.use(express.json());

//app.use((req, res, next) => {res.json({msj: "En mantenimiento"})})

app.use(['/users','/usuarios'], userRoutes);

app.use(['/products','/productos'], productRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
