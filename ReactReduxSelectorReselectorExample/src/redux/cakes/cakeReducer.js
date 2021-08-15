import { createSelector } from "reselect"
import { BUY_CAKE } from "./cakeType"

const initalState = {
	numOfCakes: 10
}

const cakeReducer = (state = initalState, action) => {
	switch (action.type) {
		case BUY_CAKE:
			return {
				...state,
				numOfCakes: state.numOfCakes - 1
			}
		default:
			return state
	}
}

export default cakeReducer

export const numOfCakeSelector = (state) => state.cake.numOfCakes

// if numOfCakeSelector gives same values, the function on the right hand side will not executed (cache)
export const totalCakePriceSelector = createSelector(numOfCakeSelector, (numOfCakes) => numOfCakes * 3.99)

// Further optimization
/*
Let's assume we use a reselector in some component and use this way:

<SomeComponent itemId={1} />
<SomeComponent itemId={2} />

In this situation, reselector will be called like this:

selectItemForThisComponent(state, 1)
selectItemForThisComponent(state, 2)

Reselectors only cached the last value. So we must use reselector this way:

const makeUniqueSelectorInstance = () => createSelector(
    [selectItems, selectItemId],
    (items, itemId) => items[itemId]
)

const makeMapState = (state) => {
    const selectItemForThisComponent = makeUniqueSelectorInstance();

    return function realMapState(state, ownProps) {
        const item = selectItemForThisComponent(state, ownProps.itemId);

        return {item};
    }
}

With this way, makeUniqueSelectorInstance will return function instead of object. Two components will get their own unique
copies of selectItemForThisComponent.
*/
