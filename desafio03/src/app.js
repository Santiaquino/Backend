// importacion de la clase y creacion de una instancia
import ProductManager from './productManager.js';
const ins = new ProductManager('./products.json');
//importacion de express
import express, { response } from 'express';
const app = express();
// puerto
const PUERTO = 8080;

// servidor escuchando
app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto: ${PUERTO}.`);
});

// primer endpoint
app.get('/products', async (req, res) => {
  const products = await ins.getProducts();
  const limit = products.filter(el => el.id <= req.query.limit);
  if (req.query.limit === undefined) {
    res.send(JSON.stringify(products));
  }
  else if (req.query.limit == 0){
    res.send(JSON.stringify(products));
  }
  else res.send(JSON.stringify(limit));
});

// segundo endpoint
app.get('/products/:pid', async(req, res) => {
  const product = await ins.getProductById(req.params.pid);
  res.send(JSON.stringify(product));
});