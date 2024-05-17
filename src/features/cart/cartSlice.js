import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // Get the correct pizza based on id.
      const item = state.cart.find(item => item.pizzaId === action.payload);
      // Increase quantity by one.
      item.quantity++;
      // Set the total price based on quantity * price.
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // Get the correct pizza based on id.
      const item = state.cart.find(item => item.pizzaId === action.payload);

      // Decrease quantity by one.
      item.quantity--;

      // Set the total price based on quantity * price.
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;

// Selectors. @todo: Optimise using 'reselct' redux library.
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, pizza) => sum + pizza.totalPrice, 0);
export const getCartQuantity = (state) => state.cart.cart.reduce((sum, pizza) => sum + pizza.quantity, 0);
export const getCart = (state) => state.cart.cart;
export const getCurrentQuantityById = id => (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;