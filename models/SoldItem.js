const mongoose = require("mongoose");

const soldItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderStatus",
      required: true,
    },
    requireDeliveryDate: {
      type: Date,
      default: null,
    },
    sellerNote: {
      type: String,
      default: "",
    }, 
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("SoldItem", soldItemSchema);
