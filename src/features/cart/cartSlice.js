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
    updateItemIngredients(state, action) {
      // Find updated item.
      const updatedItem = state.cart.find(item => item.pizzaId === action.payload.pizzaId)

      // Get current ingredients and the updated ingredients from the payload.
      const currentIngredients = updatedItem.ingredients;
      const updatedIngredients = action.payload.updatedIngredients;

      // Separate added and removed ingredients into new arrays.
      const addedIngredients = updatedIngredients.filter(x => !currentIngredients.includes(x));
      const removedIngredients = currentIngredients.filter(x => !updatedIngredients.includes(x));

      // Update state with the added and removed ingredients.
      updatedItem.addIngredients = addedIngredients;
      updatedItem.removeIngredients = removedIngredients;
    },
    clearCart(state) {
      state.cart = [];
    },
  }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, updateItemIngredients, clearCart} = cartSlice.actions;

// Selectors. @todo: Optimise using 'reselct' redux library.
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, pizza) => sum + pizza.totalPrice, 0);
export const getCartQuantity = (state) => state.cart.cart.reduce((sum, pizza) => sum + pizza.quantity, 0);
export const getCart = (state) => state.cart.cart;
export const getCurrentQuantityById = id => (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;