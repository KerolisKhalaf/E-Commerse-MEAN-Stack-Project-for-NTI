// require("dotenv").config();
const express = require("express");
const connectDB = require("./db/dbConnection");

const app = express();
app.use(express.json());
connectDB();

// Routes
app.use("/api/user", require("./src/modules/user/user.route"));
app.use("/api/admin", require("./src/modules/admin/admin.route"));
app.use("/api/card", require("./src/modules/card/card.route"));
app.use("/api/cart", require("./src/modules/cart/cart.route"));
app.use("/api/order", require("./src/modules/order/order.route"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




//defoult admin token
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Nzk2NzQ1YTg3MmQ0YjlhYmVhMDNjMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1Mjc5NzQ0OX0.KcJE9ZPMKeeFLA88I9ft2woa-u4ieYQI5_5JhtA7WOk