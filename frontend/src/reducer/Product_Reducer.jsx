import { ADD_PRODUCT, UPDATE_PRODUCT } from "../action-type/Action"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
 
// Post API 
export const addProducts = createAsyncThunk(

    ADD_PRODUCT.add_product,
    async (val) => {
        const response = await fetch('http://localhost:4441/api/v1/product', {
            method: 'POST',

            body: val
        })

        const data = await response.json()
        // console.log("dataaaa", data)

        return data
    }
);


// GET API

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
      try {
        const response = await axios.get('http://localhost:4441/api/v1/product');
        console.log("Get API response =>", response.data);
        return response.data;
      } catch (error) {
        console.log("ERROR IN PRODUCT GET API", error);
        throw error; // Rethrow the error for the calling code to handle
      }
    }
  );


  //update API

//   export const updateProduct = createAsyncThunk(

//     UPDATE_PRODUCT.update_product,
//     async (val) => {
//         const response = await fetch(`http://localhost:4441/api/v1/product/${val.id}`, {
//             method: 'PUT',

//             body: val
//         })

//         const data = await response.json()
//         console.log("Updated dataaaa", data)

//         return data
//     }
// );

export const updateProduct = createAsyncThunk(UPDATE_PRODUCT.update_product, async (val) => {


   await fetch(`http://localhost:4441/api/v1/product/${val.id}`, {
      method: 'PUT',
     
      body:val
    })
      .then((res) => {
        res.json().then((data) => {
          console.log("API update response", data);
          return data
        })
      })
  
      .catch(error => {
        console.log("error msy ============>", error);
  
  
      });
  
  })
  