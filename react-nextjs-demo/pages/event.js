function EventList({ eventList }) {
	return (
		<>
			<h1>List of Events</h1>
			{eventList.map((event) => {
				return (
					<div key={event.id}>
						<h2>
							{event.id} {event.title} {event.date} | {event.category}
						</h2>
					</div>
				)
			})}
		</>
	)
}

export default EventList

export async function getServerSideProps() {
	const response = await fetch("http://localhost:3001/events")
	const data = await response.json()
	return {
		props: {
			eventList: data
		}
	}
}
