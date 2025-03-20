import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categoriesSlice";
import subcategoriesSlice from "./slices/subcategoriesForEachCategory";
import wishListSlice from "./slices/WishlistSlice";
import subcategory from "./slices/subcategory";
import authReducer from "./slices/auth";
import productSlice from "./slices/productSlice";
import onSaleSlice from "./slices/onSaleSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    subcategories: subcategoriesSlice,
    wishListSlice,
    subcategory: subcategory,
    auth: authReducer,
    products: productSlice,
    onSale: onSaleSlice,
  },
});
