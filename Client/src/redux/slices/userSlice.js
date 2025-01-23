import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./productSlice";
import { BACKEND_BASE_URL } from "../../rootExports";

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
    const token = localStorage.getItem("token")
    const response = await fetch(`${BACKEND_BASE_URL}/api/user/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            }
        });
        const userDetails = await response.json();
       return userDetails;
})

