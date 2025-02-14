const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const port = process.env.PORT;
const env = process.env.NODE_ENV;

const AuthRoutes = require("./routes/Authroutes.js");
const OrderRoutes = require("./routes/OrderRoutes.js");
const ProductRoutes = require("./routes/ProductRoutes.js");


app.use(cors());
app.use(express.json());


app.use("/api/user", AuthRoutes);
app.use("/api/order", OrderRoutes); 
app.use("/api/product", ProductRoutes);

app.listen(port, async () => {
  await connectDB();
 if(env==="production")  console.log(`Pizzaland server running`);
 else  console.log(`Server running on port : ${port}`);
});
