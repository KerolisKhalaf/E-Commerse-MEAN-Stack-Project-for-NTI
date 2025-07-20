const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
  quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  status: { type: String, enum: ["pending", "processing", "completed", "cancelled"], default: "pending" },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema); 