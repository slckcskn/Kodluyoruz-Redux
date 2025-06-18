import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './productsSlice.jsx'

export const store = configureStore({
    reducer: {
        products: productsSlice
    },
})