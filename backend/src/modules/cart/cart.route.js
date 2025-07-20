const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { createCart, getCart, updateCart, deleteCart } = require("./cart.controller");

router.post("/", verifyToken, createCart);
router.get("/", verifyToken, getCart);
router.put("/", verifyToken, updateCart);
router.delete("/", verifyToken, deleteCart);

module.exports = router; 