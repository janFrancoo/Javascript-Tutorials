import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { buyCake, numOfCakeSelector, totalCakePriceSelector } from "../redux"

function HooksCakeContainer() {
	const numberOfCakes = useSelector((state) => numOfCakeSelector(state))
	const cakeTotalPrice = useSelector((state) => totalCakePriceSelector(state))
	const dispatch = useDispatch()

	return (
		<div>
			<h2>Number of Cakes - {numberOfCakes}</h2>
			<h4>Total price of all cakes in store - {cakeTotalPrice}</h4>
			<button onClick={() => dispatch(buyCake())}>Buy Cake</button>
		</div>
	)
}

export default HooksCakeContainer
