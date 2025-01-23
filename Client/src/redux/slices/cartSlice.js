import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";
import { BACKEND_BASE_URL } from "../../rootExports";

const cartSlice = createSlice({
    name:"cart",

    initialState:{
        data:[],
        totalPrice:0,
        totalItems:0,
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(fetchCartItems.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.data=action.payload.cartItems
            state.totalPrice=action.payload.totalPrice
            state.totalItems=action.payload?.cartItems?.length
            state.status=STATUSES.IDLE
            
        })

        .addCase(fetchCartItems.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })

    }

   

})

export const {extraReducers} = cartSlice.actions; // extraReducers are actions here

export default cartSlice.reducer;


//function to fetch products from cart
export const fetchCartItems=createAsyncThunk("cart/fetch",async()=>{
    const response = await fetch(`${BACKEND_BASE_URL}/api/product/cart/getCartItems`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem("token")
        }
    });
    const data = await response.json();
    return data;
})
