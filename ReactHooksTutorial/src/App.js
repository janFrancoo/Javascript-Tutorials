import React from "react"
import UserForm from "./components/customHookDemo/UserForm"

export const UserContext = React.createContext() // belongs to context demo
export const ChannelContext = React.createContext() // belongs to context demo

/*const initialState = 0
const reducer = (state, action) => {
	switch (action) {
		case "INCREMENT":
			return state + 1
		case "DECREMENT":
			return state - 1
		default:
			return state
	}
}*/
export const CountContext = React.createContext()

function App() {
	// const [count, dispatch] = useReducer(reducer, initialState)

	return (
		<div className="App">
			{/* <UserContext.Provider value={"JanFranco"}>
				<ChannelContext.Provider value={"Channel"}>
					<ComponentC />
				</ChannelContext.Provider>
  </UserContext.Provider> */}

			{/*
			Count - {count}
			<CountContext.Provider value={{ countState: count, countDispatch: dispatch }}>
				<ComponentA />
        <ComponentB />
  </CountContext.Provider> */}

			<UserForm />
		</div>
	)
}

export default App
