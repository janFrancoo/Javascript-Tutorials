function ArticleListByCategory({ articles, category }) {
	return (
		<>
			<h1>{category}</h1>
			{articles.map((article) => {
				return (
					<div key={article.id}>
						<h2>
							{article.id} {article.title}
						</h2>
						<p>{article.description}</p>
					</div>
				)
			})}
		</>
	)
}

export default ArticleListByCategory

export async function getServerSideProps(context) {
	const { params } = context
	const { category } = params
	const response = await fetch(`http://localhost:3001/news?category=${category}`)
	const data = await response.json()
	return {
		props: {
			articles: data,
			category
		}
	}
}
