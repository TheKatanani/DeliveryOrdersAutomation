const mongoose = require("mongoose");

const productSpecificationSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Assuming you have a Product model
      required: true,
    },
    HP: {
      type: Number,
      required: true,
    },
    user_w_kg: {
      type: Number,
      required: true,
    },
    Run_w_cm: {
      type: Number,
      required: true,
    },
    A_inc_percent: {
      type: Number,
      required: true,
    },
    speed_kmh: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    whatsApp_Number: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+\d{10,15}$/.test(v); // Validates international phone numbers
        },
        message: (props) => `${props.value} is not a valid WhatsApp number!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductSpecification", productSpecificationSchema);
