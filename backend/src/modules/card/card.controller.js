const Card = require("../../../db/models/card.model");

exports.createCard = async (req, res) => {
  try {
    const { name, description, price, image, quantity, category, owner } = req.body;
    const card = await Card.create({ name, description, price, image, quantity, category, owner });
    res.status(201).json({ message: "Product created successfully", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("owner");
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate("owner");
    if (!card) return res.status(404).json({ message: "Product not found" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { name, description, price, image, quantity, category, owner } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, quantity, category, owner },
      { new: true }
    );
    if (!card) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    if (!card) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product quantity updated", card });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
