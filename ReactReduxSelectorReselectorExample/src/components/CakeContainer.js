import React from "react"
import { connect } from "react-redux"
import { buyCake, numOfCakeSelector } from "../redux"

function CakeContainer(props) {
	const handleBuyCakeButton = () => {
		props.buyCake()
	}

	return (
		<div>
			<h2>Number of Cakes - {props.numberOfCakes}</h2>
			<button onClick={handleBuyCakeButton}>Buy Cake</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		numberOfCakes: numOfCakeSelector(state)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		buyCake: () => dispatch(buyCake())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer)
