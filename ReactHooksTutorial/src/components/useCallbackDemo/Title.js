import React from "react"

function Title() {
	return (
		<div>
			<h1>Title</h1>
		</div>
	)
}

export default React.memo(Title) // when increment age or salary, title rerendered. React.memo will prevent this
// React.memo will check props, if no change, no render
