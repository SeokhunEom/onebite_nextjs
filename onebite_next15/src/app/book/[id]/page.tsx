import { BookData, ReviewData } from "@/types";

import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";
import { notFound } from "next/navigation";
import style from "./page.module.css";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다 ...</div>;
  }
  const book: BookData = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );
  if (!response.ok) {
    throw new Error(
      `리뷰 목록을 불러오는데 실패했습니다. : ${response.status}`
    );
  }
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
}
