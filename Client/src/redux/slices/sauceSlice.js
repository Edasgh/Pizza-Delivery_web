import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";


const sauceSlice = createSlice({
    name:"sauce",

    initialState:{
        data:[],
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(searchSauces.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(searchSauces.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(searchSauces.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
        
    }

   

})

export const {extraReducers} = sauceSlice.actions; // extraReducers are actions here

export default sauceSlice.reducer;


//function to fetch crusts only
export const searchSauces = createAsyncThunk("sauces/fetch",async () => {

        const response = await fetch(`http://localhost:8080/api/product/getProducts?productType=${2}`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
   
})
