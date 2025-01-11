const mongoose = require("mongoose");
const orderDeliverySchema = new mongoose.Schema({
  // orderId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Order",
  //   required: true,
  // },
  deliveryStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderStatus",
    required: true,
  },
  deliveryName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notesFromDelivery: {
    type: String,
    default: "",
  },
  receivedMoney: {
    type: Number,
    default: 0,
  },
  sellerNoteForDelivery: {
    type: String,
    default: "",
  },
  rFiles: [{
    type: String,
    default: "",
  }, ],
  helper1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  helper2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  requireDeliveryDate: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = orderDeliverySchema