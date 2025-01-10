const mongoose = require("mongoose");

const orderTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, 
    } 
  },
  {
    timestamps: true,  
  }
);

module.exports = mongoose.model("OrderType", orderTypeSchema);
