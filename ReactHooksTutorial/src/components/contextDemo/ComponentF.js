import React from "react"
import { UserContext, ChannelContext } from "../../App"

function ComponentF() {
	return (
		<div>
			<UserContext.Consumer>
				{(user) => {
					return (
						<ChannelContext.Consumer>
							{(channel) => {
								return (
									<h3>
										{user}, {channel}
									</h3>
								)
							}}
						</ChannelContext.Consumer>
					)
				}}
			</UserContext.Consumer>
		</div>
	)
}

export default ComponentF
