import React, { useContext } from "react"
import { CountContext } from "../../../../App"

function ComponentA() {
	const countContext = useContext(CountContext)

	return (
		<div>
			A - {countContext.countState}
			<button onClick={() => countContext.countDispatch("INCREMENT")}>Increment</button>
			<button onClick={() => countContext.countDispatch("DECREMENT")}>Decrement</button>
		</div>
	)
}

export default ComponentA
