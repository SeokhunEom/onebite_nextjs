"use client";

import { useActionState, useEffect, useRef } from "react";

import deleteReviewAction from "@/actions/deleteReview.action";
import style from "./ReviewDeleteButton.module.css";

interface ReviewDeleteButtonProps {
  reviewId: number;
  movieId: number;
}

function ReviewDeleteButton({ movieId, reviewId }: ReviewDeleteButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  const onClick = () => {
    if (isPending) {
      return;
    }
    formRef.current?.requestSubmit();
  };

  return (
    <form ref={formRef} action={formAction}>
      <input name="movieId" value={movieId} hidden readOnly />
      <input name="reviewId" value={reviewId} hidden readOnly />
      <div onClick={onClick} className={style.button}>
        {isPending ? "삭제 중 ..." : "🗑️ 리뷰 삭제하기"}
      </div>
    </form>
  );
}

export default ReviewDeleteButton;
