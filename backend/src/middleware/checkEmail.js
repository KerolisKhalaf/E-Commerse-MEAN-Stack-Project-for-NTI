const User = require("../../db/models/user.model");

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email already exists" });
  next();
};

module.exports = checkEmail;
