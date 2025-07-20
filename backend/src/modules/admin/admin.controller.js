const Admin = require("../../../db/models/admin.model");
const bcrypt = require("bcryptjs");

function requireAdmin(req, res) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Admins only" });
    return false;
  }
  return true;
}

exports.createAdmin = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, email, password: hashed });
    res.status(201).json({ message: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdminById = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const { username, email, password } = req.body;
    const updateData = { username, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const admin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin updated", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
