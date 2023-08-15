
import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items : JSON.parse(localStorage.getItem('Items')) || [],
    },
    reducers:{
        addItem: (state,action) => {
            let itemID = state.items.findIndex((el)=>{
                 return (el.card.info.id === action.payload.card.info.id)
            })
            if(itemID >= 0) {
                state.items[itemID].card.info.inStock += 1
            } else{
                state.items.push(action.payload);
            }
            localStorage.setItem('Items',JSON.stringify(state.items))
        },
        removeItem : (state,action) => {
            state.items =  state.items.filter((item) => {
               return item?.card?.info?.id !== action.payload
            })
            localStorage.setItem('Items',JSON.stringify(state.items))
        },
        clearCart:(state)=>{
            state.items = []
            localStorage.setItem('Items',JSON.stringify(state.items))
        },
        increaseItem:(state,action)=>{
            let itemID = state.items.findIndex((el)=>{
                return (el.card.info.id === action.payload.card.info.id)
           })
            state.items[itemID].card.info.inStock += 1
            localStorage.setItem('Items',JSON.stringify(state.items))
        },
        decreaseItem:(state,action)=>{
            let itemID = state.items.findIndex((el)=>{
                return (el.card.info.id === action.payload.card.info.id)
           })
            if(state.items[itemID].card.info.inStock > 1){
                state.items[itemID].card.info.inStock -= 1
            }
            localStorage.setItem('Items',JSON.stringify(state.items))
        }
    },
})

export const {addItem,removeItem,clearCart,increaseItem,decreaseItem} = cartSlice.actions;
export default cartSlice.reducer;
