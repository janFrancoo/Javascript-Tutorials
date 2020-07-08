import { createStore } from "redux"
import rootProducer from "./index"

export default function configureStore() {
    return createStore(rootProducer)
}