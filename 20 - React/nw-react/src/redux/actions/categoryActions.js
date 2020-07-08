import * as actionTypes from "./actionTypes"

export const changeCategory = (category) => ({
    type: actionTypes.CHANGE_CATEGORY,
    payload: category
})
