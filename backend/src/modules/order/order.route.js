const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require("./order.controller");

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrderById);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);

module.exports = router; 