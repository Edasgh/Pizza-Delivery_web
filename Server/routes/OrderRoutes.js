const dotenv =require("dotenv");
dotenv.config();

const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const { placeOrder, viewOrder, viewAllOrders, updateOrderStatus, deleteOrder, Checkout } = require("../controllers/order");
const router = express.Router();


//By logged in user
// create a razorpay order, place order, view a single order , view all orders (placed by the user itself)
router.get("/getKey",(req,res)=>res.status(200).json({key:process.env.KEY_ID})); // get razorpay apiKey
router.get("/getKeySecret",(req,res)=>res.status(200).json({keySecret:process.env.KEY_SECRET})); // get razorpay apiSecret
router.post("/checkout",Checkout);
router.post("/place_order",fetchUser,placeOrder); 
router.get("/view_orders/:id",fetchUser,viewOrder); //id=orderId
router.delete("/delete_order/:id",fetchUser,deleteOrder);//id=orderId
router.get("/view_orders",fetchUser,viewAllOrders);

//update order status (of any user) //only by admin
router.put("/:id/update_status",fetchUser,updateOrderStatus);




module.exports=router;