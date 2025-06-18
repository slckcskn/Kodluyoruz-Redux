import { createSlice } from '@reduxjs/toolkit'
import data from '../data/product_list.json'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        money: 100000000000,
        items: data.products,
        cart: [],
        cartTotal: 0
    },
    reducers: {
        buy: (state, action) => {
            const { id, newAmount, price } = action.payload
            const product = state.items.find(item => item.id === id)
            if (product && state.money >= price) {
                state.money -= price
                state.cartTotal += price

                const cartItem = state.cart.find(item => item.id === id)
                if (cartItem) {
                    cartItem.amount = newAmount
                } else {
                    state.cart.push({ id, amount: newAmount, price, name: product.name })
                }
            }
            console.log(newAmount)
            console.log(state.cartTotal)
            console.log("Cart:", state.cart.map(({ id, amount, price, name }) => ({ id, amount, price, name })))
        },
        sell: (state, action) => {
            const { id, newAmount, price } = action.payload
            const product = state.items.find(item => item.id === id)
            if (product && newAmount > 0) {
                state.money += price
                state.cartTotal -= price

                const cartItem = state.cart.find(item => item.id === id)
                if (cartItem) {
                    cartItem.amount = newAmount
                }
                
            } else if (newAmount === 0) {
                const index = state.cart.findIndex(item => item.id === id);
                state.money += price
                state.cartTotal -= price

                if (index !== -1) {
                    state.cart.splice(index, 1);
                }
            }

            console.log(newAmount)
            console.log(state.cartTotal)
            console.log("Cart:", state.cart.map(({ id, amount, price, name }) => ({ id, amount, price, name })))
        },
    },

})


export const { buy, sell } = productsSlice.actions
export default productsSlice.reducer