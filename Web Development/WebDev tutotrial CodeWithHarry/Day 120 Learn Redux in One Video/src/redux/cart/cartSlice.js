import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], //array of {id, name, price, quantity}
  totalQuantity: 0, // total count of all items

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
        const newItem = action.payload
        const existingItem = state.items.find(item => item.id === newItem.id)
    
        if (existingItem) {
            existingItem.quantity += 1
        } else {
            state.items.push({ ...newItem, quantity: 1 })
        }
        state.totalQuantity += 1
    },
    removeItem: (state, action) => {
        const id = action.payload
        const existingItem = state.items.find(item => item.id === id)
    
        if (existingItem) {
            state.totalQuantity -= existingItem.quantity
            state.items = state.items.filter(item => item.id !== id)
        }
    },
    updateQuantity: (state, action) => {
        const {id, quantity} = action.payload
        const existingItem = state.items.find(item => item.id === id)

        if(existingItem && quantity > 0){
            state.totalQuantity += (quantity - existingItem.quantity)
            existingItem.quantity = quantity
        }
    },
    clearCart: (state)=>{
        state.items = [];
        state.totalQuantity = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer