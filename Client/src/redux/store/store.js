import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../slices/orderSlice";
import cartReducer from "../slices/cartSlice";
import productReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice";
import crustReducer from "../slices/crustSlice";
import sauceReducer from "../slices/sauceSlice";
import cheeseReducer from "../slices/cheeseSlice";
import toppingReducer from "../slices/toppingSlice";
import productsBelow20Reducer from "../slices/productsBelow20Slice";


export const store = configureStore({
    reducer:{
        user:userReducer,
        product:productReducer,
        productsBelow20:productsBelow20Reducer,
        crust:crustReducer,
        sauce:sauceReducer,
        cheese:cheeseReducer,
        topping:toppingReducer,
        cart:cartReducer,
        order:orderReducer
    }
})