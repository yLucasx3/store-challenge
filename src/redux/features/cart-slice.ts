import { ProductCart } from "@/types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: ProductCart[];
  amount: number;
}

const initialState: CartState = {
  items: [],
  amount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ProductCart>) => {
      const productToAdd = state.items.find(
        (product) => product.id === action.payload.id
      );

      if (productToAdd) {
        productToAdd.quantity += 1;
        state.amount += productToAdd.price;

        return;
      }

      state.items = [...state.items, action.payload];
      state.amount += action.payload.quantity * action.payload.price;
    },
    removeProductFromCart: (state, action: PayloadAction<ProductCart>) => {
      const { id, quantity, price } = action.payload;

      state.items = state.items.filter((product) => product.id !== id);

      state.amount -= quantity * price;
    },
    addQuantityOfProductsToCart: (
      state,
      action: PayloadAction<ProductCart>
    ) => {
      const productToAdd = state.items.find(
        (product) => product.id === action.payload.id
      );

      if (productToAdd) {
        productToAdd.quantity += 1;
        state.amount += productToAdd.price;
      }
    },
    subtractQuantityOfProductsToCart: (
      state,
      action: PayloadAction<{ productId: string }>
    ) => {
      const { productId } = action.payload;

      const productToSubtract = state.items.find(
        (product) => product.id === productId
      );

      if (productToSubtract) state.amount -= productToSubtract.price;

      if (productToSubtract && productToSubtract.quantity === 1) {
        state.items = state.items.filter(
          (product) => product.id !== action.payload.productId
        );

        return;
      }

      if (productToSubtract) {
        productToSubtract.quantity -= 1;
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  addQuantityOfProductsToCart,
  subtractQuantityOfProductsToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
