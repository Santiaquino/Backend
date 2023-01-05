// importacion de la clase y creacion de la instancia
import ProductManager from './productManager.js';
const ins = new ProductManager('./products.json');
//importacion de express
import express, { response } from 'express';
const app = express();
// puerto
const PUERTO = 8080;

// permite que se pueda enviar informacion tambien desde la URL
app.use(express.urlencoded({extended:true}));

// servidor escuchando
app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto: ${PUERTO}.`);
});

// primer endpoint
app.get('/products', async (req, res) => {
  try {
    const products = await ins.getProducts();
    const limit = products.filter(el => el.id <= req.query.limit);
    if (req.query.limit === undefined) {
      res.send(JSON.stringify({products}));
    }
    else if (req.query.limit == 0) {
      res.send(JSON.stringify({products}));
    }
    else res.send(JSON.stringify(limit));
  }
  catch (err) {
    throw new Error(err);
  }
});

// segundo endpoint
app.get('/products/:pid', async (req, res) => {
  try{
    const product = await ins.getProductById(req.params.pid);
    res.send(JSON.stringify(product));
  }
  catch (err) {
    throw new Error(err);
  }
});