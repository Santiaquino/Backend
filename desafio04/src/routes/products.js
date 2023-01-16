import { Router } from 'express';
const router = Router();
import productManager from '../manager/productManager.js';
const ins = new productManager('./json/products.json');

router.get('/', async (req, res) => {
  try {
    const products = await ins.getProducts();
    const limit = products.filter(el => el.id <= req.query.limit);
    if (req.query.limit === undefined) {
      res.json({ status: 'success!', products: products });
    }
    else if (req.query.limit == 0) {
      res.json({ status: 'success!', products: products });
    }
    else res.json({ status: 'success!', product: limit });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    if (id == 0) return res.status(404).json({status: 'recourse not be found'});
    const product = await ins.getProductById(id);
    if (product === undefined) return res.status(404).json({status: 'recourse not be found'});
    res.json({ status: 'success!', product: product });
  }
  catch (err) {
    throw new Error(err);
  }
})

router.post('/', async (req, res) => {
  try{
    const body = req.body;
    const product = await ins.addProducts(body.title, body.description, body.code, body.price, body.status, body.stock, body.category, body.thumbnail);
    if (!product) return res.status(400).json({status: 'Enter all data'});
    else return res.json({status: 'success!'});
  }
  catch(err){
    throw new Error(err);
  }
});

router.put('/:pid', async (req, res) => {
  try{
    const body = req.body;
    const id = req.params.pid;
    if (id == 0) return res.status(404).json({status: 'recourse not be found'});
    const newProduct = await ins.updateProduct(id, body);
    if (!newProduct) return res.status(404).json({status: 'recourse not be found'});
    else return res.json({status: 'sucess!'});
  }
  catch (err){
    throw new Error(err);
  }
});

router.delete('/:pid', async (req, res) => {
  try{
    const id = req.params.pid;
    if (id == 0) return res.status(404).json({status: 'recourse not be found'});
    const product = await ins.deleteProduct(id);
    if (!product) return res.status(404).json({status: 'recourse not be found'});
    else return res.json({status: 'success!'});
  }
  catch (err){
    throw new Error(err);
  }
});

export default router;