import React, { useContext } from "react"
import { ChannelContext, UserContext } from "../../App"
import ComponentF from "./ComponentF"

function ComponentE() {
	const user = useContext(UserContext)
	const channel = useContext(ChannelContext)

	return (
		<div>
			<ComponentF />
			<h3>
				{user}, {channel}
			</h3>
		</div>
	)
}

export default ComponentE
