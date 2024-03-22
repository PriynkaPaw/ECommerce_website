import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find(item => item.id === itemId);
      if (item) {
        item.quantity += 1;
        item.price += item.price
        
      }

    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
