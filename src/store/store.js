import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import categoryReducer from "./category";
import cartReducer from "./cart";
const store = configureStore({
    reducer:{
        user:userReducer,
        category:categoryReducer,
        cart:cartReducer
    }
})
export default store;