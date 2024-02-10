import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import categoryReducer from "./category";
const store = configureStore({
    reducer:{
        user:userReducer,
        category:categoryReducer
    }
})
export default store;