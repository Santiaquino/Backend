import { Router } from 'express';
const router = Router();
import productManager from '../dao/dbManagers/products.js';
const ins = new productManager();

router.get('/', async (req, res) => {
  try {
    const products = await ins.getAll();
    res.json({status:'success!', result: products});
  }
  catch (err) {
    throw new Error(err);
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await ins.getProductById(id);
    res.json({status:'success!', result: product});
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
    res.json({ status: 'success!', result: saveProduct});
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