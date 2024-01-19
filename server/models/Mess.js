const mongoose = require('mongoose');

const MessSchema = new mongoose.Schema({
  messType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'],
    required: true
  },
  productId: String,
  priceId: String,
  paymentType: {
    type: String,
    enum: ['monthly', 'one-time'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  image: {
    type: String 
  }
});

const Mess = mongoose.model('Mess', MessSchema);

module.exports = Mess;
