const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require("./user.controller");
const checkEmail = require("../../middleware/checkEmail");
const verifyToken = require("../../middleware/verifyToken");

router.post("/register", checkEmail, register);
router.post("/login", login);

// فقط الأدمن يمكنه رؤية كل المستخدمين
router.get("/", verifyToken, getAllUsers);

// باقي العمليات تتطلب توكن
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
