import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"

export default function changeCategoryReducer(state=initialState.currentCategory, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CATEGORY:
            return action.payload
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return
        default:
            return state;
    }
}