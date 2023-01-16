import express from 'express';
const app = express();
const PORT = 8080;
import routerProducts from './routes/products.js';
import routerCarts from './routes/carts.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));