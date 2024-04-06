import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
    buyers_phone: {
      type: String,
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
    delivery_address: {
      type: String,
      required: false
    },
    sold_by : {
     type: mongoose.Schema.Types.ObjectId,
     ref: "user",
     required: true
    },
    sold_at :{
     type: mongoose.Schema.Types.ObjectId,
     ref: "store",
     required: true
    }
  }, { timestamps: true })

  const Sales = mongoose.model('sales', SalesSchema);

export default Sales;
