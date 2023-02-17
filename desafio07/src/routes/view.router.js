import { Router } from 'express';
import { productsModel } from '../dao/models/products.model.js';
import { cartsModel } from '../dao/models/carts.model.js'


const router = Router();

router.get('/chat', async (req, res) => {
  res.render('chat');
});

router.get('/products', async (req, res) => {
  try {
    let query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const reqQuery = req.query.query;
    if (reqQuery === undefined) {
      query = {}
    }
    else {
      query = JSON.parse(reqQuery);
    }
    const sort = req.query.sort || '';
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate(query, { page, limit, sort: { price: sort }, lean: true });
    const products = docs;
    query = JSON.stringify(query);
    res.render('products', {
      products,
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      limit,
      query,
      sort
    });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsModel.findOne({ _id: cid });
    const cartPid = cart.products.map(el => el.pid);
    let products = [];
    cartPid.forEach(el => {
      let obj = {
        title: el.title,
        description: el.description,
        code: el.code,
        price: el.price,
        status: el.status,
        stock: el.stock,
        category: el.category,
        thumbnail: el.thumbnail
      }
      products.push(obj)
    });
    res.render('carts', { products })
  }
  catch (err) {
    throw new Error(err);
  }
});

export default router;