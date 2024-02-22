import { createSlice } from "@reduxjs/toolkit";
import { LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGECARTKEY } from "../config";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartData:[],
        cartLen:0
    },
    reducers:{
        addTocart(state, {payload}){

            state.cartData = [...state.cartData, payload];
            state.cartLen += 1;
        },
        removeFromCart(state, {payload}){
            state.cartData = state.cartData.filter((value)=>{
                return value.id != payload.id
            });
            localStorage.setItem(LOCALSTORAGECARTKEY, JSON.stringify(state.cartData));
        },
        resetCartData(state, {payload}){
            state.cartData = [];
            state.cartLen = 0
        },
        addNum(state, {payload}){
            state.cartLen = payload
        },
        adjustItemPrice(state, {payload}){
            state.cartData = state.cartData.map((value)=>{
                
                if (value.id == payload.id){
                    value.itemNum = payload.itemNum;
                }
                return value
            })
        }
    },
   

})

export default cartSlice.reducer;

const {addTocart, removeFromCart, addNum, resetCartData, adjustItemPrice }= cartSlice.actions;

export {addTocart, removeFromCart, addNum, resetCartData, adjustItemPrice}