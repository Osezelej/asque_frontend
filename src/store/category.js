import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:'creator/album',
    initialState:{
        category:[],
    },
    reducers:{
        addCategory(state, {payload}){
            state.category = [...state.category, payload];
        },
        removeCategory(state, {payload}){
            state.category = state.category.filter((value)=>{
               return value !== payload
            });
        },
        resetCategory(state, {payload}){
            state.category = []
        }
    }
})

const categoryReducer = categorySlice.reducer;
export const {addCategory, removeCategory, resetCategory} = categorySlice.actions;
export default categoryReducer;