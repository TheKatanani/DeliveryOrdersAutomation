const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",  
      required: true,
    },
    COST_WO_VAT: {
      type: Number,
      required: true,
      min: 0,
    },
    CONST_W_VAT: {
      type: Number,
      required: true,
      min: 0,
    },
    PRICE_WO_VAT: {
      type: Number,
      required: true,
      min: 0,
    },
    SALE_PRICE_W_VAT: {
      type: Number,
      required: true,
      min: 0,
    },
    profit_ratio: {
      type: Number,
      required: true,
      min: 0,
    },
    factory_cost: {
      type: Number,
      required: true,
      min: 0,
    },
    store_cost: {
      type: Number,
      required: true,
      min: 0,
    },
    show_cost: {
      type: Number,
      required: true,
      min: 0,
    },
    total_cost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pricing", pricingSchema);
