import { cartsModel } from '../models/carts.model.js';

export default class CartsManager {
  constructor() {
    console.log('Manejo de carritos')
  }

  getAll = async () => {
    try {
      const carts = await cartsModel.find();
      return carts;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await cartsModel.findOne({ _id: id });
      return cart;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  saveCart = async () => {
    try {
      const newCart = await cartsModel.create({ products: [] });
      return newCart;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  updateCart = async (id, obj) => {
    try {
      const result = await cartsModel.updateOne({ _id: id }, { $set: obj });
      return result;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  deleteCart = async (cid) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      await this.updateCart(cid, { products: [] });
      return cart;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  saveProduct = async (cid, pid) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      const products = cart.products;
      const newProducts = products.map(el => el.pid);
      console.log(products);
      console.log(newProducts)
      const product = newProducts.find(el => el._id == pid);
      if (product === undefined) {
        products.push({pid: pid, quantity: 1});
      }
      else {
        products.quantity++;
      }
      await this.updateCart(cid, { products: products });
      return product;
    }
    catch (err) {
      throw new Error(err);
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      const products = cart.products;
      const newProducts = products.filter(el => el.id != pid);
      await this.updateCart(cid, { products: newProducts });
    }
    catch (err) {
      throw new Error(err);
    }
  };

  updateProduct = async (cid, pid, obj) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      const products = cart.products;
      const product = products.find(el => el.id == pid);
      product.quantity = obj.quantity || product.quantity;
      await this.updateCart(cid, {products: products});
      return product;
    }
    catch (err) {
      throw new Error(err)
    }
  };
}