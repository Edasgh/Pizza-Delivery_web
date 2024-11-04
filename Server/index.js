const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const port = process.env.PORT;


const AuthRoutes = require("./routes/AuthRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const ProductRoutes = require("./routes/ProductRoutes");


app.use(cors());
app.use(express.json());


app.use("/api/user", AuthRoutes);
app.use("/api/order", OrderRoutes); 
app.use("/api/product", ProductRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port : ${port}`);
});