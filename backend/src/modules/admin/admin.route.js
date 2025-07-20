const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} = require("./admin.controller");

router.post("/", verifyToken, createAdmin);
router.get("/", verifyToken, getAllAdmins);
router.get("/:id", verifyToken, getAdminById);
router.put("/:id", verifyToken, updateAdmin);
router.delete("/:id", verifyToken, deleteAdmin);

module.exports = router;
