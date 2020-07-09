import * as actionTypes from "./actionTypes"

export const changeCategory = (category) => ({
    type: actionTypes.CHANGE_CATEGORY,
    payload: category
})

export const getCategories = () => (function(dispatch) {
    const url = "http://localhost:3000/categories"
    return fetch(url).then(res => res.json())
    .then(res => dispatch(getCategoriesSuccess(res)))
})

export const getCategoriesSuccess = (categories) => ({
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories
})
