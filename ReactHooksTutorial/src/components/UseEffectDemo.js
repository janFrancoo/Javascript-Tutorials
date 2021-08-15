import React, { useEffect, useState } from "react"

function UseEffectDemo() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		document.title = `You clicked ${count} times`

		return () => {
			console.log("Component will unmount implementation in useEffect hook")
		}
	}, [count])
	// use effect will run the function in every update
	// by passing [count], the function will run only when the count updated
	// with [], the function will run just once at start

	return (
		<div>
			<button onClick={() => setCount((prevCount) => prevCount + 1)}>Increment</button>
		</div>
	)
}

export default UseEffectDemo
