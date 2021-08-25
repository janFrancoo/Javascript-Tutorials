import Link from "next/link"

function Home() {
	return (
		<>
			<h1>Hello, World!</h1>
			<Link href="/product">
				<a>Product List</a>
			</Link>
		</>
	)
}

export default Home
