import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";

const userSlice = createSlice({
    name:"user",

    initialState:{
        data:{},
        status:STATUSES.IDLE
    },

    reducers:{

    },
// extrareducers help the function to fetch user details and show them accordingly on the UI
    extraReducers:(builder)=>{
        builder

        .addCase(getUserDetails.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        })

        .addCase(getUserDetails.fulfilled,(state,action)=>{
            state.data=action.payload
            state.status=STATUSES.IDLE
            
        })

        .addCase(getUserDetails.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })

    }

   

})

export const {extraReducers} = userSlice.actions; // extraReducers are actions here

export default userSlice.reducer;


//function to fetch products
export const getUserDetails=createAsyncThunk("user/fetch",async()=>{
    const response = await fetch("http://localhost:8080/api/user/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const userDetails = await response.json();
       return userDetails;
})

