import { Provider } from "react-redux"
import CakeContainer from "./components/CakeContainer"
import HooksCakeContainer from "./components/HooksCakeContainer"
import IceCreamContainer from "./components/IceCreamContainer"
import store from "./redux/store"

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<CakeContainer />
				<HooksCakeContainer />
				<IceCreamContainer />
			</div>
		</Provider>
	)
}

export default App
