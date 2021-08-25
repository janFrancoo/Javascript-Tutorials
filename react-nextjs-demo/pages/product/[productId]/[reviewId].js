import { useRouter } from "next/router"

function ReviewDetail() {
	const router = useRouter()
	const reviewId = router.query.reviewId

	return <h2>Review detail - {reviewId}</h2>
}

export default ReviewDetail
