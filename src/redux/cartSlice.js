
import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items : [],
    },
    reducers:{
        addItem: (state,action) => {
            state.items.push(action.payload);
            console.log(state.items);
        },
        removeItem : (state,action) => {
            state.items =  state.items.filter((item) => {
               return item.card.info.id !== action.payload
            })
        },
        clearCart:(state)=>{
            state.items = []
        },
        // increaseItem:(state,action)=>{
        //     state.items.push(action.payload)
        // }
    },
})

export const {addItem,removeItem,clearCart,increaseItem,decreaseItem} = cartSlice.actions;
export default cartSlice.reducer;
