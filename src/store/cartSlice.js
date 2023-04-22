import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const cartItem = state.cart.find(
        (item) => item.product.id === product.id
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.cart.push({
          product: product,
          quantity: 1,
        });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.cart.find((item) => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity += amount;
        if (cartItem.quantity === 0) {
          state.cart = state.cart.filter(
            (item) => item.product.id !== productId
          );
        }
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cart = state.cart.filter((item) => item.product.id !== productId);
    },
  },
});

export const selectNumbertOfItems = (state) => state.cart.cart.length;

export const selectSubTotal = (state) => {
  const cart = state.cart.cart;
  return cart.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
};

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectSubTotal,
  (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectTotal = createSelector(
  selectSubTotal,
  selectDeliveryPrice,
  (subtotal, deliveryFee) => (subtotal + deliveryFee).toFixed(2)
)
