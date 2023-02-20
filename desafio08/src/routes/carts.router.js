import { Router } from "express";
import CartsManager from '../dao/dbManagers/carts.js';
import { cartsModel } from "../dao/models/carts.model.js";

const router = Router();
const ins = new CartsManager();

router.get('/', async (req, res) => {
  try {
    const carts = await ins.getAll();
    res.json({ status: 'success!', payload: carts });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;

    let result = await cartsModel.findOne({_id:cid});
    res.json({ status: 'success!', payload: result });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const saveCart = await ins.saveCart();
    res.json({ status: 'success!', payload: saveCart });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const result = await ins.saveProduct(cid, pid);
    res.json({ status: 'success!', payload: result });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await ins.deleteAllProducts(cid);
    res.json({ status: 'success!', payload: cart });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await ins.deleteProduct(cid, pid);
    res.json(result);
  }
  catch (err) {
    throw new Error(err);
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const body = req.body;

    const newProducts = body.products;
    await ins.updateCart(cid, { products: newProducts });
    res.json({ status: 'success!', payload: newProducts });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const body = req.body;

  const result = await ins.updateProduct(cid, pid, body);
  res.json(result);
});

export default router;