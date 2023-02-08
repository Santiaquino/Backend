import mongoose from "mongoose";

const collection = 'carts';
const schema = new mongoose.Schema({
  products: Array
});

export const cartsModel = new mongoose.model(collection, schema);