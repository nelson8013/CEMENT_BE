import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    quantity_in_store: {
      type: Number,
      default: 0
    },
    sales_rep: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "user",
     required: true
   },
    is_active: {
      type: Boolean,
      default: true
    }
  }, { timestamps: true })

  const Store = mongoose.model('store', StoreSchema);

export default Store;
