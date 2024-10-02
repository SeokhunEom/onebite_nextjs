import { ReviewData } from "@/types";
import ReviewDeleteButton from "./ReviewDeleteButton";
import style from "./ReviewItem.module.css";

function ReviewItem({ id, content, author, createdAt, movieId }: ReviewData) {
  const date = new Date(createdAt);
  const dateStr = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 작성됨`;

  return (
    <div className={style.container}>
      <div className={style.info_container}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>{dateStr}</div>
      </div>
      <div className={style.content}>{content}</div>
      <ReviewDeleteButton movieId={movieId} reviewId={id} />
    </div>
  );
}

export default ReviewItem;
