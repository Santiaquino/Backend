import { Router } from 'express';
import { productsModel } from '../dao/models/products.model.js';
import productManager from '../dao/dbManagers/products.js';
import { cartsModel } from '../dao/models/carts.model.js'


const router = Router();
const ins = new productManager();

router.get('/chat', async (req, res) => {
  res.render('chat');
});

router.get('/products', async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const query = req.query.query || {};
  const sort = req.query.sort;
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate(query, { page, limit, sort: { price: sort }, lean: true });
  const products = docs;
  res.render('products', {
    products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
    limit,
    query,
    sort,
    value
  });
});

router.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsModel.findOne({ _id: cid });
  const cartProducts = cart.products.map(el => el.pid);
  res.render('carts', { cartProducts })
});

export default router;