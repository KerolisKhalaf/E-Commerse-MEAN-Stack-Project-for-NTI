const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb", {
     
    });
    console.log("MongoDB connected ✅");

    // إنشاء أدمن افتراضي إذا لم يكن موجودًا
    const Admin = require("./models/admin.model");
    const bcrypt = require("bcryptjs");
    const defaultAdmin = {
      username: "kerolis khalaf",
      email: "keroliskhalaf@gmail.com",
      password: "kerolis123",
      role: "admin"
    };
    const exists = await Admin.findOne({ email: defaultAdmin.email });
    if (!exists) {
      const hashed = await bcrypt.hash(defaultAdmin.password, 10);
      await Admin.create({
        username: defaultAdmin.username,
        email: defaultAdmin.email,
        password: hashed,
        role: "admin"
      });
      console.log("Default admin created ✅");
    }

    const User = require("./models/user.model");
    const userExists = await User.findOne({ email: defaultAdmin.email });
    if (!userExists) {
      const hashed = await bcrypt.hash(defaultAdmin.password, 10);
      await User.create({
        username: defaultAdmin.username,
        email: defaultAdmin.email,
        password: hashed,
        role: "admin"
      });
      console.log("Default admin also added to users ✅");
    }
  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
