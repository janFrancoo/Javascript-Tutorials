import { createStore, applyMiddleware } from "redux"
import rootProducer from "./index"
import thunk from "redux-thunk"

export default function configureStore() {
    return createStore(rootProducer, applyMiddleware(thunk) )
}
