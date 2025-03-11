import ReviewItem from "../components/review-item";

const Review = () => {
    return <div className="flex flex-col items-start gap-6 w-full">
        {new Array(5).fill(0).map((_, index) => (
            <ReviewItem key={index} />
        ))}
    </div>
}

export default Review;