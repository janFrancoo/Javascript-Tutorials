import * as actionTypes from "./actionTypes"

export const getProducts = (id) => (function(dispatch) {
    const url = "http://localhost:3000/products?categoryId=" + id;
    return fetch(url).then(res => res.json())
    .then(res => dispatch(getProductsSuccess(res)))
})

export const getProductsSuccess = (products) => ({
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: products
})
