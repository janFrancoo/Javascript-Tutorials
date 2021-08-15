import React, { useCallback, useState } from "react"
import Button from "./Button"
import Count from "./Count"
import Title from "./Title"

function ParentComponent() {
	const [age, setAge] = useState(25)
	const [salary, setSalary] = useState(50000)

	/*const incrementAge = () => {
		setAge(age + 1)
	}*/
	const incrementAge = useCallback(() => {
		setAge(age + 1)
	}, [age])
	/*
    We used React.memo in Button and Count. When user clicks increment salary, increment age also rerendered.
    React.memo can not understand incrementAge function not changes because of reference equality problem.
    useCallback hook can solve this. with useCallback we specify age value. if age value not change, React will
    behave like incrementAge not changed
    */

	const incrementSalary = useCallback(() => {
		setSalary(salary + 1000)
	}, [salary])

	return (
		<div>
			<Title />
			<Count text="Age" count={age} />
			<Button handleClick={incrementAge}>Increment age</Button>
			<Count text="Salary" count={salary} />
			<Button handleClick={incrementSalary}>Increment salary</Button>
		</div>
	)
}

export default ParentComponent
