import express from 'express';

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hola! Bienvenido a mi servidor con Express.');
});

app.get('/about', (req, res) => {
    res.send('Esta es la página Acerca de.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});