import { Router } from "express";
const router = Router();
import cartsManager from '../manager/cartsManager.js';
const ins = new cartsManager('./json/carts.json');

router.post('/', async (req, res) => {
  try {
    await ins.addCart();
    res.json({ status: 'success!' });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const id = req.params.cid;
    if (id == 0) return res.status(404).json({status:'recourse not be found'});
    const found = await ins.getCartById(id);
    if (found === undefined) return res.status(404).json({status:'recourse not be found'});
    res.json({ status: 'success!', cart: found });
  }
  catch (err) {
    throw new Error(err);
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    if (cid == 0 || pid == 0) return res.status(404).json({status:'recourse not be found'});
    await ins.addProduct(cid, pid);
    res.json({ status: 'succes!' });
  }
  catch (err) {
    throw new Error(err);
  }
});

export default router;