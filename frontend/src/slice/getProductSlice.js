import {createSlice} from "@reduxjs/toolkit"
import {  getProducts } from "../reducer/Product_Reducer"


const initialState={
    data:[],
    err:null,
    isLoding:false
}

const getProductSlice = createSlice({
    name:'getproducts',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
    builder  // posting data
   
  // GET data 
  .addCase(getProducts.pending, (state, action)=>{
      state.isLoding= true
  })
  .addCase(getProducts.fulfilled, (state, action)=>{
    state.isLoding= false

      state.data = action.payload
  })
  .addCase(getProducts.rejected, (state, action)=>{
    state.isLoding= false

      state.err = action.error.message
  })
    }
})

export default getProductSlice.reducer