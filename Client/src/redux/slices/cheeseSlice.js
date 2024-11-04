import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";


const cheeseSlice = createSlice({
    name:"cheese",

    initialState:{
        data:[],
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(fetchCheeses.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(fetchCheeses.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(fetchCheeses.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })

    }

   

})

export const {extraReducers} = cheeseSlice.actions; // extraReducers are actions here

export default cheeseSlice.reducer;


//function to fetch products from cart
export const fetchCheeses=createAsyncThunk("cheeses/fetch",async()=>{
    const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=4`, {
        method: "GET",
        headers: {
            "Content-Type": "application-json"
        }
    })
    const data = await response.json();
    return data;
})
