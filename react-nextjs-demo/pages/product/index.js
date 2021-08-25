import { useRouter } from "next/dist/client/router"
import Link from "next/link"

function ProductList() {
	const router = useRouter()

	return (
		<div>
			<Link href="/">
				<a>Home</a>
			</Link>
			<button onClick={() => router.push("/product/1")}>Product 1</button>
			<button onClick={() => router.replace("/product/2")}>Product 2</button>
			<Link href="/product/3">
				<a>Product 3</a>
			</Link>
			<Link href="/product/4" replace>
				<a>Product 4</a>
			</Link>
		</div>
	)
}

export default ProductList
