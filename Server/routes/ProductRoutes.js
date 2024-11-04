const express = require("express");
const { createProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct, searchProducts, getProductsBelow20} = require("../controllers/product");
const fetchUser = require("../middlewares/fetchUser");
const { addToCart, removeFromCart, updateItemQuantity, getCartItems } = require("../controllers/cart");
const router=express.Router();

//product routes
router.get("/getProducts",searchProducts);
router.post("/create",fetchUser,createProduct);
router.put("/:id/update",fetchUser,updateProduct);
router.delete("/:id/delete",fetchUser,deleteProduct);
router.get("/getProductsbelow20",fetchUser,getProductsBelow20);
router.get("/view_products",getAllProducts);
router.get("/view_products/:id",getSingleProduct);


//cart routes
router.post("/cart/addToCart",fetchUser,addToCart);
router.delete("/cart/:id/removeFromCart",fetchUser,removeFromCart)//id=cartItemId
router.put("/cart/:id/updateQty",fetchUser,updateItemQuantity);//id=cartItemId
router.get("/cart/getCartItems",fetchUser,getCartItems);


module.exports=router;