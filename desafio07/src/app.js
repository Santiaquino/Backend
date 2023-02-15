import express from "express";
import dirname from './utils.js';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import mongoose from "mongoose";
import cartsRouter from './routes/carts.router.js';
import viewRouter from './routes/view.router.js';
import { Server } from 'socket.io';
import MessagesManager from './dao/dbManagers/messages.js';

const ins = new MessagesManager();

const app = express();
const PORT = 8080;
const http = app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
const io = new Server(http);

const connection = mongoose.connect('mongodb+srv://santiagoaquino:Clwb3yHvsdsAKead@codercluster.lnjatj6.mongodb.net/ecommerce?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(dirname + '/public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouter);

io.on('connection', socket => {
  console.log(`usuario conectado con el id: ${socket.id}`);

  socket.on('message', async data => {
    await ins.saveMessage(data);
    const messages = await ins.getAll();
    io.emit('returnMessage', messages);
  });

  socket.on('delete', async () => {
    await ins.deleteMessages();
    io.emit('returnDelete', '')
  });
});