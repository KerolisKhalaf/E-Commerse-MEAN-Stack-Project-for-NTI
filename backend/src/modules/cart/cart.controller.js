const Cart = require("../../../db/models/cart.model");

exports.createCart = async (req, res) => {
  try {
    const cart = await Cart.create({ user: req.user.id, items: req.body.items });
    res.status(201).json({ message: "Cart created", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("user")
      .populate("items.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: req.body.items },
      { new: true }
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 