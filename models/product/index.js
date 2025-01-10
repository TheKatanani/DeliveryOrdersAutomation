const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    SKU: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    automated_description: {
      type: String,
      default: "",
    },
    made_id: {
      type: String,
      required: true,
    },
    installation_time_H: {
      type: Number,
      required: true,
      min: 0,
    },
    CBM: {
      type: Number,
      required: true,
      min: 0,
    },
    image_url: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg)$/.test(v); // Validate image URLs
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Assuming you have a Category model
      required: true,
    },
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier", // Assuming you have a Supplier model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
