import { Router } from "express";
const router = Router();
import CartsManager from '../dao/dbManagers/carts.js';
const ins = new CartsManager();

router.get('/', async (req, res) => {
  try {
    const carts = await ins.getAll();
    res.json({ status: 'success!', result: carts });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await ins.getCartById(id);
    res.json({ status: 'success!', result: cart });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const saveCart = await ins.saveCart();
    res.json({ status: 'success!', result: saveCart });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const saveProduct = await ins.saveProduct(cid, pid);
    res.json({ status: 'success!', result: saveProduct });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await ins.deleteCart(id);
    res.json({ status: 'success!', result: cart });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await ins.deleteProduct(cid, pid);
    res.json({ status: 'success!', result: `delete the product with id: ${pid}` });
  }
  catch (err) {
    throw new Error(err);
  }
});
export default router;