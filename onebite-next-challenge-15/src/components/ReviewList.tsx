import { ReviewData } from "@/types";
import ReviewItem from "./ReviewItem";
import style from "./ReviewList.module.css";

interface ReviewListProps {
  movieId: number;
}

async function ReviewList({ movieId }: ReviewListProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const reviews: ReviewData[] = await response.json();

  return (
    <div className={style.container}>
      {reviews.map((review) => (
        <ReviewItem key={`ReviewItem-${review.id}`} {...review} />
      ))}
    </div>
  );
}

export default ReviewList;
