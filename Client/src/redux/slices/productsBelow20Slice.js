import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading"
})

const productsBelow20Slice = createSlice({
    name: "productsBelow20",

    initialState: {
        data: [],
        status: STATUSES.IDLE
    },

    reducers: {

    },
    // extrareducers help the function to fetch products and show them accordingly on the UI
    extraReducers: (builder) => {
        builder

            .addCase(fetchProductsBelow20.pending, (state, action) => {
                state.status = STATUSES.LOADING
            })

            .addCase(fetchProductsBelow20.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = STATUSES.IDLE

            })

            .addCase(fetchProductsBelow20.rejected, (state, action) => {
                state.status = STATUSES.ERROR
            })

    }



})

export const { extraReducers } = productsBelow20Slice.actions; // extraReducers are actions here

export default productsBelow20Slice.reducer;


//function to fetch products
export const fetchProductsBelow20 = createAsyncThunk("productsBelow20/fetch", async () => {
    const response = await fetch(`http://localhost:8080/api/product/getProductsbelow20`, {
        method: "GET",
        headers: {
            "Content-Type": "application-json",
            "auth-token": localStorage.getItem("token") //only admin will get
        }
    })


    const data = await response.json();
    return data;

})
