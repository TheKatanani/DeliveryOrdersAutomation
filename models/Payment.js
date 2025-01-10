const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  paymentTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentType',
    required: true,
  },
  amountPaid:Number,
  remainingBalance:Number,
  autoDate:{
    type:Date,
    default:Date.now 
  },
  confirm:{
    type:Boolean,
    default:false
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', PaymentSchema);