import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { buyIceCream, iceCreamSelector } from "../redux"

function IceCreamContainer() {
	const numberOfIceCreams = useSelector((state) => iceCreamSelector(state))
	const dispatch = useDispatch()

	return (
		<div>
			<h2>Number of Ice Creams - {numberOfIceCreams}</h2>
			<button onClick={() => dispatch(buyIceCream())}>Buy Ice Cream</button>
		</div>
	)
}

export default IceCreamContainer
