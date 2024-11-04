import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";


const toppingSlice = createSlice({
    name:"topping",

    initialState:{
        data:[],
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(searchToppings.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchToppings.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchToppings.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
       
       

    }

   

})

export const {extraReducers} = toppingSlice.actions; // extraReducers are actions here

export default toppingSlice.reducer;


//function to fetch crusts only
export const searchToppings = createAsyncThunk("toppings/fetch",async () => {

        const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=3`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})
