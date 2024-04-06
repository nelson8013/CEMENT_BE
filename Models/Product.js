import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    cost_price: {
      type: Number,
      required: true
    },
    selling_price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  }, { timestamps: true })

  const Product = mongoose.model('Product', ProductSchema);

export default Product;
