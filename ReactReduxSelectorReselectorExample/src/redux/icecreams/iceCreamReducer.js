import { BUY_ICE_CREAM } from "./iceCreamType"

const initalState = {
	numOfIceCreams: 5
}

const iceCreamReducer = (state = initalState, action) => {
	switch (action.type) {
		case BUY_ICE_CREAM:
			return {
				...state,
				numOfIceCreams: state.numOfIceCreams - 1
			}
		default:
			return state
	}
}

export default iceCreamReducer

export const iceCreamSelector = (state) => state.iceCream.numOfIceCreams
