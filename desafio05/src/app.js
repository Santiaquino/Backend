// importamos todo lo necesario
import express from 'express';
import dirname from './utils.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import viewRouter from './routes/view.router.js';
import routerProducts from './routes/products.js'
import ProductManager from './manager/productManager.js';
const ins = new ProductManager('./json/products.json');
// iniciamos express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT = 8080;

const http = app.listen(PORT, () => console.log(`Listening in port ${PORT}`));
// creamos el servidor con websockets
const io = new Server(http);
// iniciamos handlebars y usamos las routes
app.engine('handlebars', handlebars.engine());
app.set('views', dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(dirname + '/public'));
app.use('/', viewRouter);
app.use('/api/products', routerProducts);
// iniciamos el servidor
io.on('connection', socket => {
  console.log(`usuario conectado con el id: ${socket.id}`);

  socket.on('message', async () => {
    const products = await ins.getProducts();
    io.emit('products', products);
  })

  socket.on('agregar', async (data) => {
    await ins.addProducts(data.title, data.description, data.code, parseInt(data.price), data.status, parseInt(data.stock), data.category, data.thumbnail);
    const products = await ins.getProducts(); 
    io.emit('responseAgr', products);
  });

  socket.on('modificar', async (data) => {
    await ins.updateProduct(data.id, {title: data.title, description: data.description, code: data.code, price: data.price, status: data.status, stock: data.stock, category: data.category, thumbnail: data.thumbnail});
    const products = await ins.getProducts();
    io.emit('responseMod', products);
  });

  socket.on('eliminar', async (data) => {
    await ins.deleteProduct(data.id);
    const products = await ins.getProducts();
    io.emit('responseEli', products);
  });
})