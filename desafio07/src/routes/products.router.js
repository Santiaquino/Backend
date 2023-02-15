import { Router } from 'express';
import productManager from '../dao/dbManagers/products.js';
import { productsModel } from '../dao/models/products.model.js';

const router = Router();
const ins = new productManager();

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const query = req.query.query || {};
    const sort = req.query.sort;
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await productsModel.paginate({ query }, { page, limit, sort: { price: sort }, lean: true });
    const products = docs;
    let prevLink = '';
    let nextLink = '';

    if (hasPrevPage) prevLink = `http://localhost:8080/api/products?query=&page=${page - 1}`;
    if (hasNextPage) nextLink = `http://localhost:8080/api/products?query=&page=${page + 1}`;


    res.json({
      status: 'success!',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    })
  }
  catch (err) {
    throw new Error(err);
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await ins.getProductById(id);
    res.json({ status: 'success!', result: product });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail
    }
    const saveProduct = await ins.saveProduct(newProduct);
    res.json({ status: 'success!', result: saveProduct });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
    const id = req.params.pid
    const newProduct = await ins.updateProduct(id, { title, description, code, price, status, stock, category, thumbnail });
    res.json({ status: 'success!', result: newProduct });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await ins.deleteProduct(id);
    res.json({ status: 'success!', result: product });
  }
  catch (err) {
    throw new Error(err);
  }
});

export default router;