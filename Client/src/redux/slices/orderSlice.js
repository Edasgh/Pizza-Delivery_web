import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";
import { BACKEND_BASE_URL } from "../../rootExports";


const orderSlice = createSlice({
    name:"order",

    initialState:{
        data:[],
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(fetchOrders.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(fetchOrders.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(fetchOrders.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })

    }

   

})

export const {extraReducers} = orderSlice.actions; // extraReducers are actions here

export default orderSlice.reducer;


//function to fetch products
export const fetchOrders=createAsyncThunk("orders/fetch",async()=>{
    const response = await fetch(`${BACKEND_BASE_URL}/api/order/view_orders`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "auth-token":localStorage.getItem("token")
        }
    });
    const data = await response.json();
    return data;
})
