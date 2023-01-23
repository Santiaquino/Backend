import { Router } from "express";
const router = Router();
import ProductManager from "../manager/productManager.js";
const ins = new ProductManager('./json/products.json');


router.get('/', async (req, res) => {
  const products = await ins.getProducts();
  res.render('home', {products});
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
}); 

export default router;