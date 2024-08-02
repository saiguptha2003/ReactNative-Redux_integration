import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './features/counter/counterSlice'
import productReducer from './features/products/productSlice'
import cartReducer from './features/carts/cartSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
    product:productReducer,
    cart:cartReducer,
  },
})