import * as actionTypes from "./actionTypes"

export const addToCart = (product) => ({
    type: actionTypes.ADD_TO_CART,
    payload: product
})

export const removeFromCart = (product) => ({
    type: actionTypes.REMOVE_FROM_CART,
    payload: product
})
