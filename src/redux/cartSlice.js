
import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items : [],
        totalQuantity : 0,
    },
    reducers:{
        addItem: (state,action) => {
            let itemID = state.items.findIndex((el)=>{
                 return (el.card.info.id === action.payload.card.info.id)
            })
            console.log(itemID);
            if(itemID >= 0) {
                state.items[itemID].card.info.inStock += 1
            } else{
                state.items.push(action.payload);
            }
        },
        removeItem : (state,action) => {
            state.items =  state.items.filter((item) => {
               return item?.card?.info?.id !== action.payload
            })
        },
        clearCart:(state)=>{
            state.items = []
        },
        increaseItem:(state,action)=>{
            let itemID = state.items.findIndex((el)=>{
                return (el.card.info.id === action.payload.card.info.id)
           })
            state.items[itemID].card.info.inStock += 1
            // if(state.items[itemID].card.info.inStock > 1){
            //     state.items[itemID].card.info.inStock += 1
            // }
        },
        decreaseItem:(state,action)=>{
            let itemID = state.items.findIndex((el)=>{
                return (el.card.info.id === action.payload.card.info.id)
           })
            if(state.items[itemID].card.info.inStock > 1){
                state.items[itemID].card.info.inStock -= 1
            }
        }
    },
})

export const {addItem,removeItem,clearCart,increaseItem,decreaseItem} = cartSlice.actions;
export default cartSlice.reducer;
