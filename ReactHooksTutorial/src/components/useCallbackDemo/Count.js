import React from "react"

function Count({ text, count }) {
	return (
		<div>
			{text} - {count}
		</div>
	)
}

export default React.memo(Count) // when increment age or salary, count rerendered. React.memo will prevent this
// React.memo will check props, if no change, no render
