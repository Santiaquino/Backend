import { Router } from "express";
import CartsManager from '../dao/dbManagers/carts.js';
import { cartsModel } from "../dao/models/carts.model.js";

const router = Router();
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
    const cid = req.params.cid;

    let result = await cartsModel.findOne({_id:cid});
    res.json({ status: 'success!', result: result });
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

    let cart = await cartsModel.findOne({_id: cid});
    cart.products.push({pid: pid});
    await cartsModel.updateOne({_id: cid}, cart);

    res.json({ status: 'success!', result: cart });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await ins.deleteCart(cid);
    res.json({ status: 'success!', result: cart });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await ins.deleteProduct(cid, pid);
    res.json({ status: 'success!', result: `delete the product with id: ${pid}` });
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
    res.json({ status: 'success!', result: newProducts });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const body = req.body;

  const product = await ins.updateProduct(cid, pid, body);
  res.json({ status: 'success!', result: product });
});

export default router;