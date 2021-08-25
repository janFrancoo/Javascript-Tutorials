function NewsList({ articles }) {
	return (
		<>
			<h1>News List</h1>
			{articles.map((article) => {
				return (
					<div key={article.id}>
						<h2>
							{article.id} {article.title} | {article.category}
						</h2>
					</div>
				)
			})}
		</>
	)
}

export default NewsList

export async function getServerSideProps() {
	const response = await fetch("http://localhost:3001/news")
	const data = await response.json()
	return {
		props: {
			articles: data
		}
	}
}
