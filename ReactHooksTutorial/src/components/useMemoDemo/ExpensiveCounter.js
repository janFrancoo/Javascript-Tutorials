import React, { useMemo, useState } from "react"

function ExpensiveCounter() {
	const [counterOne, setCounterOne] = useState(0)
	const [counterTwo, setCounterTwo] = useState(0)

	const incrementOne = () => {
		setCounterOne(counterOne + 1)
	}

	const incrementTwo = () => {
		setCounterTwo(counterTwo + 1)
	}

	/*const isEven = () => {
		let i = 0
		while (i < 200000000) i++
		return counterOne % 2 === 0
	}*/
	const isEven = useMemo(() => {
		let i = 0
		while (i < 200000000) i++
		return counterOne % 2 === 0
	}, [counterOne])
	/*
    when we press increment two button, app is still laggy. to prevent isEvent call on increment two, we use useMemo hook
    this hook has an array parameter. in this situation, if counterOne is not changed, isEvent will not be executed
    */

	return (
		<div>
			<div>
				<button onClick={incrementOne}>Count one - {counterOne}</button>
				<span>{isEven ? "Even" : "Odd"}</span>
			</div>
			<div>
				<button onClick={incrementTwo}>Count two - {counterTwo}</button>
			</div>
		</div>
	)
}

export default ExpensiveCounter
