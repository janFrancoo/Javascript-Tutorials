import React from "react"

function Button({ handleClick, children }) {
	return (
		<div>
			<button onClick={handleClick}>{children}</button>
		</div>
	)
}

export default React.memo(Button) // when increment age or salary, button rerendered. React.memo will prevent this
// React.memo will check props, if no change, no render
