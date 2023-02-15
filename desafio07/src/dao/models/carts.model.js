import mongoose from "mongoose";

const collection = 'carts';
const schema = new mongoose.Schema({
  products: {
    type: [
      {
        pid: {
          type: mongoose.Schema.Types.ObjectId,
          ref:'products'
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    default: [],
    required: true
  },
});

schema.pre('findOne', function() {
  this.populate('products.pid');
});

export const cartsModel = new mongoose.model(collection, schema);