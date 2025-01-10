const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Assuming you have a Product model
      required: true,
    },
    sup_qty: {
      type: Number,
      required: true,
      min: 0,
    },
    STIP_Qty: {
      type: Number,
      required: true,
      min: 0,
    },
    SHR_Qty: {
      type: Number,
      required: true,
      min: 0,
    },
    total_stock: {
      type: Number,
      required: true,
      min: 0,
    },
    min_stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stock", stockSchema);
