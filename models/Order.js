const mongoose = require("mongoose");
const orderDeliverySchema = require('./orderDelivery.js')
const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  soldItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SoldItem", 
  }, ],
  orderStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderStatus", 
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment", 
  },
  regionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
    required: true,
  },
  deliveryCoordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDeliveryId: orderDeliverySchema,
  // orderDeliveryId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "orderDelivery",  
  //   required: true,
  // },
  totalAmount: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);